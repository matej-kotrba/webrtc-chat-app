<script lang="ts">
	export let onJoin: () => void = () => {};

	let roomName: string = '';
</script>

<input type="text" bind:value={roomName} />
<button on:click={onJoin}>Join</button>
