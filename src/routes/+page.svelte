<script lang="ts">
	import { Page } from '$lib/types';
	import { get } from '$lib/db';
	import { onMount } from 'svelte';

	export let page: Page;

	onMount(async () => {
		const data = await get('pages', page.slug);
		console.log(data);
	});
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
