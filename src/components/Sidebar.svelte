<script lang="ts">
	import GoogleAuth from './GoogleAuth.svelte';
	import { user } from '../stores/user';
	import { fade } from 'svelte/transition';

	export let customStyles: string = '';
</script>

<nav
	class="bg-slate-900 relative left-0 top-0 h-full flex flex-col {customStyles} overflow-hidden"
>
	<div class="flex flex-col gap-2 text-xl py-3 px-3">
		<a href="/" class="py-2 pl-5 pr-20 text-left hover:bg-slate-800 rounded-md"
			>Home</a
		>
		<div class="separator h-[1px] bg-slate-700" />
		{#if $user}
			<a
				href="/rooms"
				transition:fade
				class="py-2 pl-5 pr-20 text-left hover:bg-slate-800 rounded-md">Rooms</a
			>
			<div class="separator h-[1px] bg-slate-700" />
		{/if}
	</div>
	<!-- <div class="h-[100px] mb-auto" /> -->
	<GoogleAuth />
</nav>
