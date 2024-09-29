<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full items-stretch overflow-hidden">
	<Resizable.Pane defaultSize={20} minSize={10} maxSize={50}>
		<slot name="list" />
	</Resizable.Pane>

	<Resizable.Handle withHandle />
	<Resizable.Pane maxSize={85}><slot name="problem" /></Resizable.Pane>
</Resizable.PaneGroup>
