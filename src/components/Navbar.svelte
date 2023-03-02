<script lang="ts">
	import GoogleAuth from './GoogleAuth.svelte';
	import { user } from '../stores/user';
	import { fade } from 'svelte/transition';
</script>

<nav class="bg-slate-900 fixed left-0 top-0 h-full flex flex-col">
	<div class="flex gap-5 flex-col text-xl">
		<a
			href="/"
			class="py-2 pl-5 pr-16 text-left border-solid border-b-2 border-slate-700"
			>Home</a
		>
		{#if $user}
			<a href="/rooms" transition:fade>Rooms</a>
		{/if}
	</div>
	<GoogleAuth />
</nav>
