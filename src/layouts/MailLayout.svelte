<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';

	import { ScrollArea } from '@/components/ui/scroll-area';
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full items-stretch overflow-hidden">
	<Resizable.Pane defaultSize={20} minSize={10} maxSize={50}>
		<ScrollArea class="h-full pl-2 pr-2"><slot name="list" /></ScrollArea></Resizable.Pane
	>

	<Resizable.Handle withHandle />
	<Resizable.Pane maxSize={85}
		><ScrollArea class="h-full pl-2 pr-2"><slot name="problem" /></ScrollArea>
	</Resizable.Pane>
</Resizable.PaneGroup>
