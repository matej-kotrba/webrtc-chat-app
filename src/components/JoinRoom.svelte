<script lang="ts">
	export let onJoin: () => void = () => {};
</script>

<button on:click={onJoin} class="bg-blue-600 text-white p-4 rounded-lg">Join</button>
