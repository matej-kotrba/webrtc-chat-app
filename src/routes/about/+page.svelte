<script lang="ts">
	import { getContext } from 'svelte';

	const servers = getContext('iceServers');
</script>

{JSON.stringify(servers, null, 2)}
