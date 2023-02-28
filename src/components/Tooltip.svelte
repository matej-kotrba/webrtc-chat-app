<script lang="ts">
	export let text: string;
</script>

<div class="group/tooltip relative inline-block">
	<span
		class="absolute text-sm bg-gray-700 rounded-lg p-2
     opacity-0 pointer-events-none group-hover/tooltip:opacity-100
      duration-150 bottom-[130%] whitespace-nowrap left-[50%] translate-x-[-50%] isolate
      before:contnet-[''] before:absolute before:bg-inherit before:rotate-45 before:z-[-10]
      before:left-[50%] before:translate-x-[-50%] before:w-4 before:aspect-square before:top-[65%]"
		>{text}</span
	>
	<slot />
</div>
