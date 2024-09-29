<script lang="ts">
	import ScrollArea from '@/components/ui/scroll-area/scroll-area.svelte';
	import type { Problem } from '@/event_helpers/problems';
	import { formatTimeAgo } from '@/helpers';
	export let items: Problem[];
	export let selected: Problem;
	export let bloom: false; //todo
	import { Search } from 'lucide-svelte';
	import { Input } from '@/components/ui/input';
	import Filters from '../components/Filters.svelte';
</script>

<div class="flex flex-col gap-2">
	<div class="gap-2 px-2"><Filters /></div>
	<form class="px-2">
		<div class="relative">
			<Search class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground" />
			<Input placeholder="Search" class="pl-8" />
		</div>
	</form>
	<ScrollArea class="h-[calc(100vh-142px)]">
		<div class="flex flex-col items-center gap-2 p-2">
			{#each items as item}
				<button
					on:click={() => {
						console.log(item.event);
						selected = item;
					}}
					class="flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent"
				>
					<div class="flex w-full flex-col gap-1">
						<div class="flex items-center">
							<div class="flex items-center gap-2">
								<div class="font-semibold">{item.tldr}</div>
								{#if !bloom}
									<span class="flex h-2 w-2 rounded-full bg-blue-600" />
								{/if}
							</div>
							<div class="ml-auto text-xs text-foreground">
								{formatTimeAgo(new Date(item.event.created_at * 1000))}
							</div>
						</div>
						<div class="text-xs font-medium">{item.para}</div>
					</div>
					<div class="line-clamp-2 text-xs text-muted-foreground">
						{'todo: add full page description of problem'.substring(0, 300)}
					</div>
					<!-- {#if item.labels.length}
					<div class="flex items-center gap-2">
						{#each item.labels as label}
							<Badge variant={get_badge_variant_from_label(label)}>
								{label}
							</Badge>
						{/each}
					</div>
				{/if} -->
				</button>
			{/each}
		</div>
	</ScrollArea>
</div>
