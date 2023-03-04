<script lang="ts">
	import { loading } from '../lib/loading';
	import { fade } from 'svelte/transition';

	let shouldAnimate = false;

	$: if (loading) {
		shouldAnimate = false;
		setTimeout(() => {
			shouldAnimate = true;
		}, 1000);
	}
</script>

{#if $loading && shouldAnimate}
	<div class="container" out:fade>
		<div class="circle" />
		<div class="circle" />
		<div class="circle" />
		<div class="circle" />
	</div>
{/if}

<style>
	.container {
		display: grid;
		place-content: center;
		position: absolute;
		left: 50vw;
		top: 50vh;
		translate: -50% -50%;
		width: 150px;
		aspect-ratio: 1/1;
		border-radius: 50%;
	}

	.circle {
		position: absolute;
		width: 100%;
		height: 100%;
		transform: scale(0);
		border-radius: 50%;
		background-color: #cab938c3;
		box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.14);
		animation: scale 4s ease-in-out infinite;
	}

	.circle:nth-child(2) {
		animation-delay: 1s;
	}

	.circle:nth-child(3) {
		animation-delay: 2s;
	}

	.circle:nth-child(4) {
		animation-delay: 3s;
	}

	@keyframes scale {
		0% {
			transform: scale(0);
			opacity: 1;
		}
		80% {
			transform: scale(1);
			opacity: 1;
		}
		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
</style>
