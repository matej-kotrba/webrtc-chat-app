<script lang="ts">
	import { onMount } from 'svelte';

	export let videoSource: MediaStream | null = null;
	export let videoAttributes: {
		muted?: boolean;
		controls?: boolean;
	} = {};

	let video: HTMLVideoElement;

	$: if (video && videoSource) video.srcObject = videoSource;

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
	{...videoAttributes}
>
	<track kind="captions" />
</video>

<!-- poster="../../videoCover.png" -->
