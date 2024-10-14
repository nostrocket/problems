<script lang="ts">
	import { Input } from '@/components/ui/input';
	import ScrollArea from '@/components/ui/scroll-area/scroll-area.svelte';
	import type { Problem } from '@/event_helpers/problems';
	import { Search } from 'lucide-svelte';
	import Filters from '../components/Filters.svelte';
	import ProblemTile from '../components/RecursiveProblemTile.svelte';
	import { problems } from '@/stores/problems';
	import { onMount } from 'svelte';
	// export let problems: Problem[];
	let selected: Problem;
	let bloom: false; //todo: use a bloom filter from HH for problems that current user has already viewed, this should run on problem event ID not d-tag so that they see updates
</script>

<div class="flex flex-col gap-2">
	<div class="gap-2 px-4 pt-2"><Filters /></div>
	<form class="px-4">
		<div class="relative">
			<Search class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground" />
			<Input placeholder="Search" class="pl-8" />
		</div>
	</form>
	<ScrollArea class="h-[calc(100vh-154px)] px-4">
		<div class="flex flex-col items-center gap-2">
			{#each $problems as problem}
				<ProblemTile {problem}></ProblemTile>
			{/each}
		</div>
	</ScrollArea>
</div>
