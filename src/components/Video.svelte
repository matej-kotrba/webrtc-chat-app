<script lang="ts">
	import { onMount } from 'svelte';

	export let videoSource: MediaStream | null = null;

	let video: HTMLVideoElement;

	onMount(() => {
		video.srcObject = videoSource;
	});
</script>

<h3>This is user ...</h3>
<video
	bind:this={video}
	autoplay
	playsinline
	poster="../../videoCover.png"
	contextmenu="return false;"
	class="w-[350px] h-[200px] object-cover pointer-events-none"
>
	<track kind="captions" />
</video>
