<script lang="ts">
	import GoogleAuth from './GoogleAuth.svelte';
	import { user } from '../stores/user';
	import { fade } from 'svelte/transition';

	export let customStyles: string = '';
</script>

<nav
	class="bg-slate-900 relative left-0 top-0 h-full flex flex-col {customStyles} z-10"
>
	<div class="flex flex-col gap-2 text-xl bg-slate-900">
		<a
			href="/"
			class="py-4 pl-5 pr-20 text-left hover:bg-indigo-800 hover:shadow-xl hover:shadow-indigoTransparent 
			duration-150 flex gap-1 items-center"
			><iconify-icon icon="ic:round-home" class="text-2xl" /> Home</a
		>
		<!-- <div class="separator h-[1px] bg-slate-700" /> -->
		{#if $user}
			<a
				href="/rooms"
				transition:fade
				class="py-4 pl-5 pr-20 text-left hover:bg-indigo-800 hover:shadow-xl hover:shadow-indigoTransparent
				 duration-100 relative group/rooms flex gap-1 items-center"
				><iconify-icon
					icon="material-symbols:meeting-room-rounded"
					class="text-2xl"
				/>
				Rooms
				<div
					class="absolute left-[-100%] top-0 flex flex-col bg-indigo-900 p-2 group-hover/rooms:left-[100%]
					 hover:left-[100%] duration-200 z-[-100] rounded-tr-md rounded-br-md"
				>
					<a
						href="/rooms"
						class="whitespace-nowrap flex gap-1 items-center p-2 hover:bg-indigo-600 rounded-md duration-100"
						><iconify-icon icon="material-symbols:search" /> Search Rooms</a
					>
					<div class="separator h-[1px] my-2 bg-slate-300" />
					<a
						href="/profile/rooms"
						class="whitespace-nowrap flex gap-1 items-center p-2 hover:bg-indigo-600 rounded-md duration-100"
						><iconify-icon icon="mdi:user" /> My Rooms</a
					>
				</div>
			</a>
			<!-- <div class="separator h-[1px] bg-slate-700" /> -->
		{/if}
		<a
			href="/profile"
			transition:fade
			class="py-4 pl-5 pr-20 text-left hover:bg-indigo-800 hover:shadow-xl hover:shadow-indigoTransparent duration-100 flex gap-1 items-center"
			><iconify-icon icon="mdi:user" class="text-2xl" /> Profile</a
		>
		<a
			href="/about"
			transition:fade
			class="py-4 pl-5 pr-20 text-left hover:bg-indigo-800 hover:shadow-xl hover:shadow-indigoTransparent duration-100 flex gap-1 items-center"
			><iconify-icon icon="mdi:about-circle-outline" class="text-2xl" /> About</a
		>
	</div>
	<!-- <div class="h-[100px] mb-auto" /> -->
	<GoogleAuth />
</nav>
