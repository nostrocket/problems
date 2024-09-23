<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full max-h-[800px] items-stretch">
	<Resizable.Pane defaultSize={40} minSize={10} maxSize={50}
		><slot name="list"></slot></Resizable.Pane
	>

	<Resizable.Handle withHandle />
	<Resizable.Pane minSize={40} maxSize={85}><slot name="problem"></slot></Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane minSize={10} defaultSize={10} maxSize={30}
		><slot name="meta"></slot></Resizable.Pane
	>
</Resizable.PaneGroup>
