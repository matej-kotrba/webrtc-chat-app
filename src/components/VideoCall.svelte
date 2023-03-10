<script lang="ts">
	import Video from './Video.svelte';
	import CallControls from './CallControls.svelte';
	import JoinRoom from './JoinRoom.svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import type { DevicesState } from './video';
	import {
		collection,
		doc,
		addDoc,
		setDoc,
		onSnapshot,
		getDoc,
		updateDoc,
		query,
		where,
		DocumentReference,
		type DocumentData,
		getDocs
	} from 'firebase/firestore';
	import { firestore } from '../config/firebase';

	let pcStore: Writable<RTCPeerConnection> = getContext('peerConnection');
	let isInCall: Writable<boolean> = getContext('isInCall'); // TODO: use this

	let callIdInput: null | HTMLInputElement = null;
	let callId = '';

	let devicesState: DevicesState = {
		isCameraOn: false,
		isMicOn: false
	};

	const availableDevices: Record<string, boolean> = {
		audio: false,
		video: false
	};

	export let roomName: string;

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

	async function setupAudioAndVideo() {
		if (!availableDevices.audio) {
			console.log('You need microphone to enter video chat :(');
			return;
		}

		localStream = await navigator.mediaDevices.getUserMedia({
			audio: availableDevices.audio,
			video: availableDevices.video
		});

		remoteStream = new MediaStream();

		localStream.getTracks().forEach((track) => {
			$pcStore.addTrack(track, localStream as MediaStream);
		});

		$pcStore.ontrack = (event) => {
			if (event.streams[0] === undefined) return;
			event.streams[0].getTracks().forEach((track) => {
				remoteStream?.addTrack(track);
			});
		};
	}

	async function onCallJoin() {
		try {
			if (!firestore) return;

			const rooms = collection(firestore, 'rooms');
			const q = query(rooms, where('title', '==', roomName));
			const room = (await getDocs(q)).docs[0].ref;
			const callDoc = doc(collection(room, 'calls'));
			const offerCandidates = collection(callDoc, 'offerCandidates');
			const answerCandidates = collection(callDoc, 'answerCandidates');

			callId = callDoc.id;
			if (callIdInput) {
				callIdInput.value = callId;
			}

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

	async function onCallAnswer() {
		try {
			const rooms = collection(firestore, 'rooms');
			const q = query(rooms, where('title', '==', roomName));
			const room = (await getDocs(q)).docs[0].ref;
			const callDoc = doc(collection(room, 'calls'), callId);
			const offerCandidates = collection(callDoc, 'offerCandidates');
			const answerCandidates = collection(callDoc, 'answerCandidates');

			$pcStore.onicecandidate = (event) => {
				event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
			};

			const callData = (await getDoc(callDoc)).data();

			const offerDescription = callData?.offer;
			await $pcStore.setRemoteDescription(
				new RTCSessionDescription(offerDescription)
			);

			const answerDescription = await $pcStore.createAnswer();
			await $pcStore.setLocalDescription(answerDescription);

			const answer = {
				type: answerDescription.type,
				sdp: answerDescription.sdp
			};

			await updateDoc(callDoc, { answer });

			onSnapshot(offerCandidates, (snapshot) => {
				snapshot.docChanges().forEach((change) => {
					if (change.type === 'added') {
						let data = change.doc.data();
						$pcStore.addIceCandidate(new RTCIceCandidate(data));
					}
				});
			});
		} catch (err) {
			console.error(err);
		}
	}

	// async function hangUp() {
	// 	$pcStore.close();

	// }

	$: console.log(localStream, remoteStream);
</script>

<div class="video-chat">
	<button on:click={setupAudioAndVideo} class="p-3 bg-green-500">Setup</button>
	<input bind:value={callId} bind:this={callIdInput} class="text-black" />
	<button on:click={onCallAnswer} class="p-4 bg-red-600">Answer</button>
	<JoinRoom onJoin={onCallJoin} />
	<Video videoSource={localStream} videoAttributes={{ muted: true }} />
	<Video videoSource={remoteStream} />
	<CallControls {devicesState} />
</div>
