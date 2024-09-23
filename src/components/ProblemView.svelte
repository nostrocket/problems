<script lang="ts">
	import type { Problem } from '@/event_helpers/problems';

	export let problem: Problem;
</script>

{#if problem}
	<div class="flex flex-col space-y-2 text-center">
		<h1 class="text-2xl font-semibold tracking-tight">{problem.tldr}</h1>
		<p class="text-sm text-muted-foreground">
			{problem.para}
		</p>
	</div>
{/if}
