<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	export let options: HTMLTextareaAttributes = {};
	export let title: string = '';
	export let value: string = '';
	export let errorText: string = '';
</script>

<div class="relative w-full">
	{#if title}
		<div class="mb-1.5 text-sm font-normal">{title}</div>
	{/if}
	<textarea
		bind:value
		{...$$restProps}
		{...options}
		class="h-24 w-full rounded-lg border px-3 py-2 font-normal leading-relaxed"
	/>
	{#if errorText}
		<div class="mt-1.5 text-[13px] font-light text-red-500">{errorText}</div>
	{/if}
</div>
