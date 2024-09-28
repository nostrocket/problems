<script lang="ts">
	import * as Card from '@/components/ui/card';
	import * as HoverCard from '@/components/ui/hover-card';
	import type { Problem } from '@/event_helpers/problems';
	import { ndk } from '@/ndk';
	import { pubkey } from '@/stores/session';
	import { Avatar, Name } from '@nostr-dev-kit/ndk-svelte-components';
	import * as Carta from 'carta-md';
	import { ArrowBigLeft } from 'lucide-svelte';
	import ProfileCard from './ProfileCard.svelte';

	export let problem: Problem;
</script>

{#if problem}
	<div class="flex flex-col items-center">
		<h1 class="text-2xl font-semibold">{problem.tldr}</h1>
		<p class="text-sm text-muted-foreground">
			{problem.para}
		</p>
		<Card.Root class="m-2 w-full rounded-none p-2"
			><Card.Content class="p-0">
				<HoverCard.Root>
					<HoverCard.Trigger>
						<div class="flex flex-nowrap items-center gap-2">
							<Avatar
								ndk={$ndk}
								pubkey={problem.creator}
								class="h-8 w-8 flex-none rounded-full object-cover"
							/>
							<Name
								ndk={$ndk}
								pubkey={problem.creator}
								class="hidden max-w-32 truncate p-1 font-mono text-white dark:text-black md:inline-block"
							/>
						</div>
					</HoverCard.Trigger>
					<HoverCard.Content>
						<ProfileCard pubkey={$pubkey} />
					</HoverCard.Content>
				</HoverCard.Root></Card.Content
			></Card.Root
		>
		{#key problem.event.id}
			<div class="markdown">
				<Carta.CartaViewer carta={new Carta.Carta()} value={problem.page} />
			</div>
		{/key}
	</div>
{:else}
	<Card.Root class="m-4 mt-32 p-4"
		><Card.CardTitle class="flex items-center"
			><ArrowBigLeft size={34} />
			<h1 class="text-2xl font-semibold tracking-tight">Please select a problem</h1></Card.CardTitle
		></Card.Root
	>
{/if}

<style>
</style>
