<script lang="ts">
	import ScrollArea from '@/components/ui/scroll-area/scroll-area.svelte';
	import * as Card from '@/components/ui/card';
	import * as HoverCard from '@/components/ui/hover-card';
	import type { Problem } from '@/event_helpers/problems';
	import { ndk } from '@/ndk';
	import { pubkey } from '@/stores/session';
	import { Avatar, Name } from '@nostr-dev-kit/ndk-svelte-components';
	import { Carta, CartaViewer } from 'carta-md';
	import { ArrowBigLeft } from 'lucide-svelte';
	import ProfileCard from './ProfileCard.svelte';
	import { Button } from '@/components/ui/button';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';

	export let problem: Problem | undefined;
	export let preview: boolean = false;

	const carta = new Carta();
</script>

{#if problem}
	<ScrollArea class="h-[calc(100vh-64px)]">
		<div class="flex flex-col items-end p-4">
			<Button on:click={async () => await goto(`${base}/new/problem/${problem.atag}`)}
				>Log New Problem</Button
			>
		</div>
		<div class="flex flex-col items-center p-4">
			<h1 class="text-2xl font-semibold">{problem.tldr}</h1>
			<p class="text-sm text-muted-foreground">
				{problem.para}
			</p>
			<Card.Root class="m-2 w-full rounded-none p-2"
				><Card.Content class="p-0">
					<div class="w-fit">
						{#if !preview}
							{#key problem.creator}
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
												class="hidden max-w-32 truncate p-1 font-mono text-black dark:text-white md:inline-block"
											/>
										</div>
									</HoverCard.Trigger>
									<HoverCard.Content>
										<ProfileCard pubkey={problem.creator} />
									</HoverCard.Content>
								</HoverCard.Root>
							{/key}
						{:else if $pubkey}
							<HoverCard.Root>
								<HoverCard.Trigger>
									<div class="flex flex-nowrap items-center gap-2">
										<Avatar
											ndk={$ndk}
											pubkey={$pubkey}
											class="h-8 w-8 flex-none rounded-full object-cover"
										/>
										<Name
											ndk={$ndk}
											pubkey={$pubkey}
											class="hidden max-w-32 truncate p-1 font-mono text-black dark:text-white md:inline-block"
										/>
									</div>
								</HoverCard.Trigger>
								<HoverCard.Content>
									<ProfileCard pubkey={$pubkey} />
								</HoverCard.Content>
							</HoverCard.Root>
						{:else}
							<div>User information needs to be displayed after logging in.</div>
						{/if}
					</div>
				</Card.Content></Card.Root
			>
			{#key problem.event}
				<div class="markdown w-full">
					<CartaViewer {carta} bind:value={problem.page} />
				</div>
			{/key}
		</div>
	</ScrollArea>
{:else}
	<Card.Root class="m-4 mt-32 p-4"
		><Card.CardTitle class="flex items-center"
			><ArrowBigLeft size={34} />
			<h1 class="text-2xl font-semibold tracking-tight">Please select a problem</h1></Card.CardTitle
		></Card.Root
	>
{/if}
