<script lang="ts">
	import type { MouseEventHandler } from 'svelte/elements';

	export let title: string;
	export let onClickFnc: MouseEventHandler<HTMLButtonElement> = () => {};
</script>

<button type="button" on:click={onClickFnc}
	><p>{title}</p>
	<div><slot /></div>
</button>

<style>
	button {
		background-color: royalblue;
		color: white;
		border-radius: 10px;
		isolation: isolate;
		position: relative;
		overflow: hidden;
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 4px;
		align-items: center;
		box-shadow: royalblue 0 0 20px 0px;
		transition: 0.3s ease-in-out;
	}

	button > * {
		padding: 10px;
	}

	button > *:last-child {
		position: relative;
		background-color: white;
		color: royalblue;
		display: grid;
		place-items: center;
		height: 100%;
		padding-inline: 28px 5px;
		overflow: hidden;
	}

	button > *:last-child::after {
		content: '';
		position: absolute;
		left: 0;
		top: 50%;
		border-radius: 50%;
		transform: translateX(-50%) translateY(-50%);
		background-color: royalblue;
		width: 100%;
		aspect-ratio: 1/1;
		transition: 0.3s ease-in-out;
	}

	button:hover > *:last-child::after {
		background-color: rgb(88, 126, 239);
		border-radius: 0;
	}

	button:hover {
		background-color: rgb(88, 126, 239);
	}
</style>
