<script lang="ts">
	import Card from '@/components/ui/card/card.svelte';
	import type { Problem } from '@/event_helpers/problems';
	import { formatTimeAgo } from '@/helpers';
	import { bloom, problems, selected } from '@/stores/problems';
	import { ChevronDown, ChevronRight } from 'svelte-radix';
	import { derived } from 'svelte/store';
	export let problem: Problem;

	let children = derived(problems, ($problems) => {
		return $problems.filter((p) => {
			return p.parents().includes(problem.dtag);
		});
	});

	let isSelected = derived(selected, ($selected) => {
		return Boolean($selected == problem);
	});

	let expanded = false;
</script>

{#if problem}
	<div class="my-1">
		<Card
			on:click={() => {
				//if (!expanded && !$isSelected) {expanded = true}
				$selected = problem;
			}}
			class="problems-start flex w-full cursor-zoom-in flex-col gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent hover:bg-opacity-100 {$isSelected
				? 'bg-accent bg-opacity-90'
				: ''}"
		>
			<div class="flex w-full flex-col gap-1">
				<div class="problems-center flex">
					<div class="problems-center flex gap-2">
						<div class="font-semibold">{problem.tldr}</div>
						{#if !$bloom}
							<span class="flex h-2 w-2 rounded-full bg-blue-600" />
						{/if}
					</div>
					<div class="ml-auto text-xs text-foreground">
						{formatTimeAgo(new Date(problem.event.created_at * 1000))}
					</div>
				</div>
				<div class="text-x-s font-light">{problem.para}</div>
			</div>
			<div class="line-clamp-2 text-xs text-muted-foreground">
				{problem.page.substring(0, 300)}
			</div>
			<div class="flex gap-2">
				<div
					class="flex cursor-pointer flex-row"
					on:click={() => {
						expanded = !expanded;
					}}
				>
					{#if !expanded}<ChevronRight />{:else}<ChevronDown />{/if}<span
						class="mb-auto mt-auto text-nowrap font-extralight"
						>{$children.length} sub-problems</span
					>
				</div>
			</div>
		</Card>
	</div>
	{#if expanded}
		{#each $children as child}
			<div class="flex w-full flex-col">
				<div class="pl-3">
					<svelte:self problem={child}></svelte:self>
				</div>
			</div>
		{/each}
	{/if}
{/if}
