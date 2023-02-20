<script lang="ts">
	import Video from './Video.svelte';
	import CallControls from './CallControls.svelte';
	import JoinRoom from './JoinRoom.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { firebase } from '../config/firebase';
	import type { DevicesState } from './video';
	import { collection, doc, addDoc, setDoc, onSnapshot } from 'firebase/firestore';

	let pcStore: Writable<RTCPeerConnection> = getContext('peerConnection');
	let isInCall: Writable<boolean> = getContext('isInCall');

	let devicesState: DevicesState = {
		isCameraOn: false,
		isMicOn: false
	};

	const availableDevices: Record<string, boolean> = {
		audio: false,
		video: false
	};

	onMount(() => {
		navigator.mediaDevices.enumerateDevices().then((devices) => {
			devices.forEach((device) => {
				if (device.kind === 'audioinput') availableDevices.audio = true;
				else if (device.kind === 'videoinput') availableDevices.video = true;
			});
		});
	});

	let localStream: MediaStream | null = null;
	let remoteStream: MediaStream | null = null;

	async function onCallJoin() {
		try {
			if (!availableDevices.audio) {
				console.log('You need microphone to enter video chat :(');
				return;
			}

			localStream = await navigator.mediaDevices.getUserMedia({
				audio: availableDevices.audio,
				video: availableDevices.video
			});

			remoteStream = new MediaStream();

			// console.log(localStream);

			localStream.getTracks().forEach((track) => {
				// console.log(track);
				$pcStore.addTrack(track);
			});

			$pcStore.ontrack = (event) => {
				// console.log(event);
				event.streams[0].getTracks().forEach((track) => {
					remoteStream?.addTrack(track);
				});
			};

			const callDoc = doc(collection(firebase, 'calls'));
			const offerCandidates = collection(callDoc, 'offerCandidates');
			const answerCandidates = collection(callDoc, 'answerCandidates');

			console.log(callDoc.id);

			$pcStore.onicecandidate = (event) => {
				event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
			};

			const offerDescription = await $pcStore.createOffer();
			await $pcStore.setLocalDescription(offerDescription);

			const offer = {
				sdp: offerDescription.sdp,
				type: offerDescription.type
			};

			await setDoc(callDoc, { offer });

			// Listening to changes in firestore and update the streams accordingly

			onSnapshot(callDoc, (snapshot) => {
				const data = snapshot.data();

				if (!$pcStore.currentLocalDescription && data?.answer) {
					const answerDescription = new RTCSessionDescription(data.answer);
					$pcStore.setRemoteDescription(answerDescription);
				}
			});

			// If answered add candidates to the peer connection
			onSnapshot(answerCandidates, (snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type === 'added') {
						const candidate = new RTCIceCandidate(change.doc.data());
						$pcStore.addIceCandidate(candidate);
					}
				});
			});
		} catch (err) {
			console.error(err);
		}
	}
</script>

<div class="video-chat">
	<JoinRoom onJoin={onCallJoin} />
	<Video videoSource={localStream} />
	<Video videoSource={remoteStream} />
	<CallControls {devicesState} />
</div>
