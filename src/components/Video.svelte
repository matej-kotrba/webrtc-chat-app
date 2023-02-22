<script lang="ts">
	import { onMount } from 'svelte';

	export let videoSource: MediaStream | null = null;
	export let videoAttributes: {
		controls?: boolean;
		src?: string;
		width?: number;
		height?: number;
		autoplay?: boolean;
		loop?: boolean;
		muted?: boolean;
		poster?: string;
	} = {};

	let video: HTMLVideoElement;

	$: if (video && videoSource) {
		console.log('this happened');
		video.srcObject = videoSource;
	}

	onMount(() => {
		video.srcObject = videoSource;
	});
</script>

<h3>This is user ...</h3>
<video
	bind:this={video}
	autoplay
	playsinline
	contextmenu="return false;"
	class="w-[350px] h-[200px] object-cover pointer-events-none"
	muted
	{...videoAttributes}
>
	<track kind="captions" />
</video>

<!-- poster="../../videoCover.png" -->
