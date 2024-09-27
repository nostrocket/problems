<script lang="ts">
	import * as Card from '@/components/ui/card';
	import type { Problem } from '@/event_helpers/problems';
	import { ArrowBigLeft } from 'lucide-svelte';
	import * as Carta from 'carta-md';

	export let problem: Problem;
</script>

{#if problem}
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">{problem.tldr}</h1>
		<p class="text-sm text-muted-foreground">
			{problem.para}
		</p>
		{#key problem.event.id}
			<Carta.CartaViewer carta={new Carta.Carta()} value={problem.page} />
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
