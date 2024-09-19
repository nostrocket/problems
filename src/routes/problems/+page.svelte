<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { Problem } from '@/event_helpers/problems';
	import { ndk } from '@/ndk';
	import { NDKEvent } from '@nostr-dev-kit/ndk';
	import type { NDKEventStore } from '@nostr-dev-kit/ndk-svelte';
	import { Avatar, Name } from '@nostr-dev-kit/ndk-svelte-components';
	import { onDestroy } from 'svelte';
	import { derived } from 'svelte/store';
	import ProfileCard from '../../components/ProfileCard.svelte';

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
			<Card.Root class="overflow-hidden rounded-lg bg-white shadow-md">
				<Card.Content class="p-6">
					<div class="mb-2 text-lg font-semibold">{problem.tldr}</div>
					<HoverCard.Root>
						<HoverCard.Trigger>
							<div
								class="mb-4 flex w-fit cursor-default select-none items-center rounded-full px-2 py-1 hover:bg-gray-100"
							>
								<Avatar
									ndk={$ndk}
									pubkey={problem.creator}
									class="h-10 w-10 flex-none rounded-full object-cover"
								/>
								<Name
									ndk={$ndk}
									pubkey={problem.creator}
									class="hidden max-w-32 truncate p-2 md:inline-block"
								/>
							</div>
						</HoverCard.Trigger>
						<HoverCard.Content>
							<ProfileCard pubkey={problem.creator} />
						</HoverCard.Content>
					</HoverCard.Root>

					<div class="text-gray-700">{problem.para}</div>
				</Card.Content>
			</Card.Root>
		{/each}
	</div>
</div>
