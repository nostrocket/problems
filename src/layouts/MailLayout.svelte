<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	import Badge from '@/components/ui/badge/badge.svelte';
	import { Input } from '@/components/ui/input';
	import { ScrollArea } from '@/components/ui/scroll-area';
	import { Search } from 'lucide-svelte';
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full max-h-[800px] items-stretch">
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

		<ScrollArea class="h-screen"><slot name="list" /></ScrollArea></Resizable.Pane
	>

	<Resizable.Handle withHandle />
	<Resizable.Pane minSize={40} maxSize={85}
		><ScrollArea class="h-screen"><slot name="problem" /></ScrollArea></Resizable.Pane
	>
	<Resizable.Handle withHandle />
	<Resizable.Pane minSize={10} defaultSize={10} maxSize={30}
		><ScrollArea class="h-screen"><slot name="meta" /></ScrollArea></Resizable.Pane
	>
</Resizable.PaneGroup>
