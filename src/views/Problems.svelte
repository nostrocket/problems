<script lang="ts">
	import { Problem } from '@/event_helpers/problems';
	import { ndk } from '@/ndk';
	import { NDKEvent } from '@nostr-dev-kit/ndk';
	import type { NDKEventStore } from '@nostr-dev-kit/ndk-svelte';
	import { onDestroy } from 'svelte';
	import { derived } from 'svelte/store';
	import MailLayout from '../layouts/MailLayout.svelte';
	import MailList from '../layouts/MailList.svelte';
	import ProblemView from '../components/ProblemView.svelte';

	let problems: NDKEventStore<NDKEvent> | undefined;
	onDestroy(() => {
		problems?.unsubscribe();
	});

	problems = $ndk.storeSubscribe([{ kinds: [31971 as number] }], { subId: 'rockets' });

	const validProblems = derived(problems, ($problems) =>
		$problems.map(Problem.fromEvent).filter((problem) => problem.isValid())
	);

	let selected: Problem;
</script>

<MailLayout>
	<div slot="list">
		<MailList items={$validProblems} bloom={false} bind:selected />
	</div>
	<div slot="problem"><ProblemView problem={selected} /></div>
</MailLayout>
