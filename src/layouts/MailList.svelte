<script lang="ts">
	import { Input } from '@/components/ui/input';
	import ScrollArea from '@/components/ui/scroll-area/scroll-area.svelte';
	import { problems } from '@/stores/problems';
	import { Search } from 'lucide-svelte';
	import Filters from '../components/Filters.svelte';
	import ProblemTile from '../components/RecursiveProblemTile.svelte';
	import { derived } from 'svelte/store';

	let filtered = derived(problems, ($problems) => {
		return $problems.filter((p) => {
			return p.parents().length == 0;
		});
	});
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
			{#each $filtered as problem}
				<ProblemTile {problem}></ProblemTile>
			{/each}
		</div>
	</ScrollArea>
</div>
