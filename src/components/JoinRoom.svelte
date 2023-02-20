<script lang="ts">
	export let onJoin: () => void = () => {};

	let roomName: string = '';
</script>

<input type="text" bind:value={roomName} />
<button on:click={onJoin} class="bg-blue-600 text-white p-4 rounded-lg">Join</button>
