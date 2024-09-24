<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	import { ScrollArea } from '@/components/ui/scroll-area';
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full max-h-[800px] items-stretch">
	<Resizable.Pane defaultSize={40} minSize={10} maxSize={50}
		><ScrollArea class="h-screen"><slot name="list" /></ScrollArea></Resizable.Pane
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
