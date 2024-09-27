<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import * as Resizable from '$lib/components/ui/resizable';
	import { Button } from '@/components/ui/button';
	import { Input } from '@/components/ui/input';
	import { ScrollArea } from '@/components/ui/scroll-area';
	import { Search } from 'lucide-svelte';
	import { PlusSolid } from 'svelte-awesome-icons';
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full items-stretch">
	<Resizable.Pane defaultSize={40} minSize={10} maxSize={50}>
		<div
			class="bg-background/95 p-2 pt-1 backdrop-blur supports-[backdrop-filter]:bg-background/60"
		>
			<div class="p-2 pt-1"><slot name="filters" /></div>
			<form>
				<div class="relative">
					<Search
						class="absolute left-2 top-[50%] h-4 w-4 translate-y-[-50%] text-muted-foreground"
					/>
					<Input placeholder="Search" class="pl-8" />
				</div>
			</form>
		</div>

		<ScrollArea class="h-full"><slot name="list" /></ScrollArea></Resizable.Pane
	>

	<Resizable.Handle withHandle />
	<Resizable.Pane minSize={40} maxSize={85}
		><ScrollArea class="h-full overflow-hidden pl-2 pr-2"><slot name="problem" /></ScrollArea
		></Resizable.Pane
	>
	<Resizable.Handle withHandle />
	<Resizable.Pane minSize={10} defaultSize={10} maxSize={30}
		><ScrollArea class="h-full p-2 pt-0"
			><slot name="meta" /><Button on:click={async () => await goto(`${base}/logNewProblem`)}
				><PlusSolid /></Button
			></ScrollArea
		></Resizable.Pane
	>
</Resizable.PaneGroup>
