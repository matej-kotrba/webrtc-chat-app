<script lang="ts">
	import { enhance } from '$app/forms';
	import type { InputTypeAttributes } from '../../types/form';
	export let actionLink: string;
	export let formInputs: {
		name: string;
		text: string;
		placeholder?: string;
		type: InputTypeAttributes;
	}[];
	export let dialogRef: any = null;
	export let submitButtonText: string = 'Submit';

	let formRef: HTMLFormElement | null = null;
</script>

<form
	class="lg:min-w-[450px]"
	use:enhance
	method="POST"
	action="?/{actionLink}"
	bind:this={formRef}
>
	<div class="my-8">
		<p class="font-extrabold text-lg text-center my-2">
			<slot name="title" />
		</p>
		{#each formInputs as { name, text, type, placeholder }}
			<div class="p-2 my-2 flex justify-center items-center gap-2 relative">
				<label for={name}>{text}: </label>
				<div class="relative">
					<input
						{name}
						{type}
						placeholder={placeholder || ''}
						class="bg-transparent p-2 text-white outline-none border-solid border-b-2 border-gray-700 peer
								overflow-hidden text-ellipsis"
					/>
					<div
						class="content-[''] absolute w-full h-[2px] bottom-[0px] bg-indigo-600 left-[50%]
								translate-x-[-50%] scale-x-0 duration-200 peer-focus-within:scale-x-100"
					/>
				</div>
			</div>
		{/each}
	</div>
	<div class="flex gap-2 bg-slate-700 p-4">
		<button
			type="button"
			class="inline-block mr-auto border-2 bg-indigo-600 border-none px-4 py-2 rounded-full
					shadow-md shadow-blackTransparent hover:text-indigo-600 hover:bg-white duration-100"
			on:click={() => {
				formRef?.reset();
			}}>Clear</button
		>
		{#if dialogRef}
			<button
				type="button"
				class="inline-block border-2 bg-indigo-600 border-none px-4 py-2 rounded-full
					shadow-md shadow-blackTransparent hover:text-indigo-600 hover:bg-white duration-100"
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