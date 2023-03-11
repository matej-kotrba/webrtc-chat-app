<script lang="ts">
	import { page } from '$app/stores';
</script>

<div>
	<p class="status-code text-white font-extrabold text-center">
		{$page.status}
	</p>
	<p class="text-center text-3xl">
		{$page.error?.message}
	</p>
</div>

<style>
	.status-code {
		font-size: 8rem;
	}
</style>
