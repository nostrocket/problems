<script lang="ts">
	import { Problem } from '@/event_helpers/problems';
	import { ndk } from '@/ndk';
	import { NDKEvent } from '@nostr-dev-kit/ndk';
	import type { NDKEventStore } from '@nostr-dev-kit/ndk-svelte';
	import { onDestroy } from 'svelte';
	import { derived } from 'svelte/store';
	import ProblemPreviewCard from '../../components/ProblemPreviewCard.svelte';

	let problems: NDKEventStore<NDKEvent> | undefined;
	onDestroy(() => {
		problems?.unsubscribe();
	});

	problems = $ndk.storeSubscribe([{ kinds: [31971 as number] }], { subId: 'rockets' });

	const validProblems = derived(problems, ($problems) =>
		$problems.map(Problem.fromEvent).filter((problem) => problem.isValid())
	);
</script>

<div class="flex flex-col gap-4">
	<div class="grid w-full flex-1 grid-cols-1 items-start gap-4 sm:grid-cols-3 md:gap-2">
		{#each $validProblems as problem}
			<ProblemPreviewCard {problem} />
		{/each}
	</div>
</div>
