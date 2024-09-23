<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full max-h-[800px] items-stretch">
	<Resizable.Pane collapsible minSize={15} maxSize={30}><slot name="list"></slot></Resizable.Pane>

	<Resizable.Handle withHandle />
	<Resizable.Pane minSize={40} maxSize={85}><slot name="problem"></slot></Resizable.Pane>
	<Resizable.Handle withHandle />
	<Resizable.Pane minSize={15} maxSize={30}><slot name="meta"></slot></Resizable.Pane>
</Resizable.PaneGroup>
