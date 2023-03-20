<script lang="ts">
	import { enhance } from '$app/forms';
	import { updateCurrentUser } from 'firebase/auth';
	import type { HTMLInputAttributes } from 'svelte/elements';
	export let actionLink: string;
	export let formInputs: ({
		name: string;
		text: string;
		error?: string;
	} & HTMLInputAttributes)[];
	export let dialogRef: any = null;
	export let submitButtonText: string = 'Submit';

	let formRef: HTMLFormElement | null = null;

	let isLoading: boolean = false;
</script>

<form
	class="lg:min-w-[450px]"
	use:enhance={() => {
		isLoading = true;
		return async ({ update }) => {
			await update();
			isLoading = false;
		};
	}}
	method="POST"
	action="?/{actionLink}"
	bind:this={formRef}
>
	{#if isLoading}
		<div
			class="absolute inset-0 bg-black bg-opacity-25 grid content-center z-10"
		>
			<div class="flex justify-center">
				<iconify-icon
					icon="mdi:loading"
					class="animate-spin text-[4rem] text-blue-400"
				/>
			</div>
		</div>
	{/if}
	<div />
	<div class="my-8">
		<p class="font-extrabold text-lg text-center my-2">
			<slot name="title" />
		</p>
		{#each formInputs as { text, error, ...attrs }}
			<div
				class="{attrs.type !== 'hidden'
					? 'p-2 my-2'
					: ''} flex flex-col justify-center items-center gap-2 relative"
			>
				<fieldset
					class={attrs.type !== 'hidden'
						? 'border-gray-700 border-2 rounded-lg focus-within:border-indigo-500 text-gray-400 focus-within:text-indigo-400 duration-150'
						: ''}
				>
					{#if attrs.type !== 'hidden'}
						<legend class="ml-2"><label for={attrs.name}>{text}</label></legend>
					{/if}
					<!-- <input
						{...attrs}
						class="bg-transparent p-2 text-white outline-none border-solid border-b-2 border-gray-700 peer
						overflow-hidden text-ellipsis"
					/>
					<div
						class="content-[''] absolute w-full h-[2px] bottom-[0px] bg-indigo-600 left-[50%]
						translate-x-[-50%] scale-x-0 duration-200 peer-focus-within:scale-x-100"
					/> -->
					<input
						type="text"
						{...attrs}
						class="bg-transparent p-2 pt-1 pb-3 text-white outline-none overflow-hidden text-ellipsis placeholder:text-gray-500"
					/>
				</fieldset>
			</div>
			{#if error}
				<p class="text-red-500 text-center">{error}</p>
			{/if}
		{/each}
	</div>
	<div class="flex gap-2 bg-slate-700 p-4">
		<button
			type="button"
			class="inline-block mr-auto border-2 bg-transparent border-indigo-500 border-solid px-4 py-2 rounded-full
					shadow-md shadow-blackTransparent hover:bg-indigo-500 duration-100"
			on:click={() => {
				formRef?.reset();
			}}>Clear</button
		>
		{#if dialogRef}
			<button
				type="button"
				class="inline-block border-2 bg-transparent border-indigo-500 border-solid px-4 py-2 rounded-full
					shadow-md shadow-blackTransparent hover:bg-indigo-500 duration-100"
				on:click={() => {
					dialogRef?.close();
				}}>Cancel</button
			>
		{/if}
		<button
			type="submit"
			class="inline-block border-2 bg-indigo-600 border-none px-4 py-2 rounded-full
					shadow-md shadow-blackTransparent hover:text-indigo-600 hover:bg-white duration-100"
			>{submitButtonText}</button
		>
	</div>
</form>
