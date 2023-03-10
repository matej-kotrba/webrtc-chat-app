<script lang="ts">
	import Dialog from './Dialog.svelte';
	import BasicForm from '../forms/BasicForm.svelte';

	export let actionLink: string;
	export let formTitle: string;
	export let roomId: string;

	let dialogRef: any = null;

	export function openDialog() {
		dialogRef?.open();
	}
</script>

<Dialog bind:this={dialogRef}>
	<svelte:fragment slot="header">
		<h2 class="font-extrabold text-2xl flex items-center">
			<iconify-icon
				icon="material-symbols:meeting-room-outline-rounded"
			/>{formTitle}
		</h2>
	</svelte:fragment>
	<svelte:fragment slot="main">
		<BasicForm
			{actionLink}
			formInputs={[
				{
					name: 'roomId',
					text: 'Room ID',
					type: 'hidden',
					value: roomId
				},
				{
					name: 'password',
					text: 'Password',
					type: 'password',
					placeholder: 'Enter password'
				}
			]}
			{dialogRef}
			submitButtonText={'Join'}
		/>
	</svelte:fragment>
</Dialog>
