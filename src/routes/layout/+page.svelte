<script lang="ts">
	import { Problem } from '@/event_helpers/problems';
	import { ndk } from '@/ndk';
	import { NDKEvent } from '@nostr-dev-kit/ndk';
	import type { NDKEventStore } from '@nostr-dev-kit/ndk-svelte';
	import { onDestroy } from 'svelte';
	import { derived } from 'svelte/store';
	import MailLayout from '../../layouts/MailLayout.svelte';
	import MailList from '../../layouts/MailList.svelte';

	let problems: NDKEventStore<NDKEvent> | undefined;
	onDestroy(() => {
		problems?.unsubscribe();
	});

	problems = $ndk.storeSubscribe([{ kinds: [31971 as number] }], { subId: 'rockets' });

	const validProblems = derived(problems, ($problems) =>
		$problems.map(Problem.fromEvent).filter((problem) => problem.isValid())
	);
</script>

<MailLayout>
	<div slot="list">
		<MailList items={$validProblems} bloom={false} />
	</div>
</MailLayout>
