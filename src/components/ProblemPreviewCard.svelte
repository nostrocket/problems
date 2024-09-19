<script lang="ts">
	import * as Card from '@/components/ui/card';
	import * as HoverCard from '@/components/ui/hover-card';
	import { ndk } from '@/ndk';
	import { Avatar, Name } from '@nostr-dev-kit/ndk-svelte-components';
	import ProfileCard from './ProfileCard.svelte';
	import type { Problem } from '@/event_helpers/problems';
	import { devmode } from '@/stores/session';
	import { Button } from '@/components/ui/button';
	export let problem: Problem;
</script>

<Card.Root class="overflow-hidden rounded-lg bg-white shadow-md dark:bg-slate-800">
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

		<div class="text-gray-700 dark:text-white">{problem.para}</div>
	</Card.Content>
	{#if $devmode}
		<Card.Footer
			><Button on:click={() => console.log(problem.event.rawEvent())}>Print to console</Button
			></Card.Footer
		>
	{/if}
</Card.Root>
