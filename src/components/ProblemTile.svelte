<script lang="ts">
	import type { Problem } from '@/event_helpers/problems';
	import { formatTimeAgo } from '@/helpers';
	export let problem: Problem;
	export let bloom: boolean;
	export let selected: Problem | undefined;
</script>

{#if problem}
	<button
		on:click={() => {
			console.log(problem.event.rawEvent());
			selected = problem;
		}}
		class="problems-start flex w-full flex-col gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
	>
		<div class="flex w-full flex-col gap-1">
			<div class="problems-center flex">
				<div class="problems-center flex gap-2">
					<div class="font-semibold">{problem.tldr}</div>
					{#if !bloom}
						<span class="flex h-2 w-2 rounded-full bg-blue-600" />
					{/if}
				</div>
				<div class="ml-auto text-xs text-foreground">
					{formatTimeAgo(new Date(problem.event.created_at * 1000))}
				</div>
			</div>
			<div class="text-x-s font-medium">{problem.para}</div>
		</div>
		<div class="line-clamp-2 text-xs text-muted-foreground">
			{'todo: add full page description of problem'.substring(0, 300)}
		</div>
		<!-- {#if problem.labels.length}
					<div class="flex problems-center gap-2">
						{#each problem.labels as label}
							<Badge variant={get_badge_variant_from_label(label)}>
								{label}
							</Badge>
						{/each}
					</div>
				{/if} -->
	</button>
{/if}
