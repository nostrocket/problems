<script lang="ts">
	import { page } from '$app/stores';
	import { derived, type Readable } from 'svelte/store';
	import LogNewProblem from '../../../../views/LogNewProblem.svelte';
	import type { ExtendedBaseType, NDKEventStore } from '@nostr-dev-kit/ndk-svelte';
	import { NDKEvent } from '@nostr-dev-kit/ndk';
	import { ndk } from '@/ndk';
	import { Problem } from '@/event_helpers/problems';

	let latestEvent: Readable<ExtendedBaseType<NDKEvent> | undefined>;
	let atag = $page.params.parentID.split(':');
	let events: NDKEventStore<ExtendedBaseType<NDKEvent>> | undefined;
	if (atag.length == 3) {
		events = $ndk.storeSubscribe(
			[{ '#d': [atag[2]], authors: [atag[1]], kinds: [31971 as number] }],
			{ subId: atag[2] }
		);
	}

	$: {
		if (events && !latestEvent) {
			latestEvent = derived(events, ($events) => {
				let sorted = $events.filter((e) => {
					return e.kind == 31971;
				});
				sorted = sorted.toSorted((a, b) => {
					return a.created_at - b.created_at;
				});
				return sorted[0];
			});
		}
	}
</script>

{#if latestEvent && $latestEvent}
	<LogNewProblem parent={Problem.fromEvent($latestEvent)} />
{/if}
