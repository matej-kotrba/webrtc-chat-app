<script lang="ts">
	import { enhance } from '$app/forms';
	import Dialog from '../../components/dialogs/Dialog.svelte';
	import type { ActionData } from './$types';
	import RoomPasswordDialog from '../../components/dialogs/RoomPasswordDialog.svelte';
	import BasicForm from '../../components/forms/BasicForm.svelte';
	import FancyButton from '../../components/buttons/FancyButton.svelte';
	import { user } from '../../stores/user';

	export let form: ActionData;

	let rooms: { title: string; hasPassword: boolean; id: string }[] | null =
		null;
	$: rooms = form?.body?.rooms || rooms;

	let isLoading = false;

	let createRoomDialog: Dialog;

	let passwordDialogRef: RoomPasswordDialog | null = null;
	let passwordRoomTitle = '';
	let passwordRoomId = '';
</script>

<Dialog bind:this={createRoomDialog}>
	<h2 class="font-extrabold text-2xl flex items-center" slot="header">
		<iconify-icon icon="material-symbols:meeting-room-outline-rounded" />New
		Room
	</h2>
	<BasicForm
		slot="main"
		actionLink="createRoom"
		submitButtonText="Create"
		dialogRef={createRoomDialog}
		formInputs={[
			{
				name: 'userId',
				text: 'User ID',
				value: $user?.uid,
				type: 'hidden'
			},
			{
				name: 'userEmail',
				text: 'User email',
				value: $user?.email,
				type: 'hidden'
			},
			{
				name: 'roomName',
				text: 'Room name',
				type: 'text',
				placeholder: 'Awesome room',
				value: form?.data?.roomName ?? undefined
			},
			{
				name: 'password',
				text: 'Password',
				type: 'password',
				placeholder: 'Super secret',
				error: form?.errors?.password[0]
			},
			{
				name: 'confirmPassword',
				text: 'Confirm password',
				type: 'password'
			}
		]}
	>
		<p slot="title">
			Create your <span class="text-blue-400">place</span> to
			<span class="text-blue-400">chat</span>!
		</p>
	</BasicForm>
	<!-- <button
					type="button"
					class="inline-block mr-auto border-2 bg-indigo-600 border-none px-4 py-2 rounded-full
					shadow-md shadow-blackTransparent hover:text-indigo-600 hover:bg-white duration-100"
					on:click={() => {
						formRoom.reset();
					}}>Clear</button
				>
				<button
					type="button"
					class="inline-block border-2 bg-indigo-600 border-none px-4 py-2 rounded-full
					shadow-md shadow-blackTransparent hover:text-indigo-600 hover:bg-white duration-100"
					on:click={() => {
						createRoomDialog.close();
					}}>Cancel</button
				>
				<button
					type="submit"
					class="inline-block border-2 bg-indigo-600 border-none px-4 py-2 rounded-full
					shadow-md shadow-blackTransparent hover:text-indigo-600 hover:bg-white duration-100"
					>Create</button
				> -->
</Dialog>

<RoomPasswordDialog
	bind:this={passwordDialogRef}
	actionLink="checkPassword"
	formTitle="Joining room: {passwordRoomTitle}"
	roomId={passwordRoomId}
/>

<!-- class="bg-indigo-500 rounded-lg p-3" -->
<div class="flex justify-end">
	<FancyButton
		title="Create you own room!"
		onClickFnc={() => createRoomDialog.open()}
		><iconify-icon icon="gridicons:create" class="text-xl" /></FancyButton
	>
</div>
<div class="perspective-container isolate mb-24">
	<form
		action="?/findRooms"
		method="POST"
		use:enhance={() => {
			isLoading = true;
			return async ({ update }) => {
				await update();
				isLoading = false;
			};
		}}
		class="relative flex flex-col items-center max-w-2xl gap-2 p-8 py-12 mx-auto"
	>
		<div
			class="z-[-10] pointer-events-none absolute w-full h-full border-8 border-indigo-800 border-solid rounded-md left-1 top-1"
		/>
		<div
			class="z-[-8] pointer-events-none shadow-xl shadow-indigo-800 absolute top-0 left-0 w-full h-full border-8 border-indigo-600 border-solid rounded-md overflow-hidden"
		>
			<img
				src="wave2.png"
				alt="Decorative wave"
				role="presentation"
				class="absolute right-[100%] w-full h-full animate-transformRight"
			/>
			<img
				src="wave2.png"
				alt="Decorative wave"
				role="presentation"
				class="absolute w-full h-full animate-transformRight left-[-2px] top-[1.2px]"
			/>
		</div>

		<label for="roomName" class="text-2xl font-extrabold"
			>Name of the room you want to <span class="text-blue-400">join</span
			></label
		>
		<input
			name="roomName"
			type="text"
			class="flex p-2 duration-150 bg-indigo-900 border-collapse rounded-lg shadow-xl outline-none focus:shadow-indigo-600 shadow-transparent color-white focus:bg-indigo-500 focus:outline-none"
		/>
		<p
			class="text-lg text-red-500 {form && form.error
				? 'opacity-100 duration-150'
				: 'opacity-0'}"
		>
			{form ? form.error || 'Placeholder' : 'Placeholder'}
		</p>
	</form>
</div>

{#if isLoading}
	<div class="flex justify-center">
		<iconify-icon
			icon="mdi:loading"
			class="animate-spin text-[4rem] text-blue-400"
		/>
	</div>
{/if}

{#if rooms}
	<p class="text-center my-2 text-xl">
		Found: <span class="font-extrabold text-blue-400">{rooms.length || 0}</span>
		result(s)
	</p>
	<div
		class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mx-2 xl:mx-24"
	>
		{#each rooms as { title, hasPassword, id }}
			{#if hasPassword}
				<button
					on:click={() => {
						if (passwordDialogRef) {
							passwordDialogRef?.openDialog();
							passwordRoomTitle = title;
							passwordRoomId = id;
						}
					}}
					class="link-to-room bg-transparent border-4 border-solid border-indigo-500 relative isolate
				p-2 rounded-md shadow-xl shadow-[#4338ca4f] group flex items-center justify-between"
				>
					<p>Room name: <span class="font-extrabold">{title}</span></p>
					<iconify-icon
						icon="system-uicons:enter"
						class="opacity-0 group-hover:opacity-100 duration-150 text-2xl"
					/>
					<iconify-icon
						icon="material-symbols:lock-outline"
						class="absolute opacity-100 group-hover:opacity-0 duration-150 text-2xl right-2 top-[50%] translate-y-[-50%]"
					/>
				</button>
			{:else}
				<a
					href="/rooms/{id}"
					class="link-to-room bg-transparent border-4 border-solid border-indigo-500 relative isolate
						p-2 rounded-md shadow-xl shadow-[#4338ca4f] group flex items-center justify-between"
				>
					<p>Room name: <span class="font-extrabold">{title}</span></p>
					<iconify-icon
						icon="system-uicons:enter"
						class="opacity-0 group-hover:opacity-100 duration-150 text-2xl"
					/>
				</a>
			{/if}
		{/each}
	</div>
{/if}

<style>
	.perspective-container > form {
		perspective: 100px;
	}

	.perspective-container div {
		transform-style: preserve-3d;
		transform: rotateX(4deg) rotateY(2deg);
	}

	.link-to-room:hover::before {
		opacity: 1;
	}

	.link-to-room::before {
		content: '';
		position: absolute;
		inset: 0;
		opacity: 0;
		z-index: -99;
		background-image: radial-gradient(circle at right, #4338ca, #4338ca00 60%);
		transition: 0.2s ease-in-out;
	}
</style>
