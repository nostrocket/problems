<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
</script>

<div class="hidden lg:block">
	<Resizable.PaneGroup direction="horizontal" class="h-full items-stretch overflow-hidden">
		<Resizable.Pane defaultSize={50} minSize={40} maxSize={60}>
			<slot name="editor" />
		</Resizable.Pane>
		<Resizable.Handle withHandle />
		<Resizable.Pane defaultSize={50} minSize={40} maxSize={60}>
			<slot name="preview" />
		</Resizable.Pane>
	</Resizable.PaneGroup>
</div>
<div class="block lg:hidden">
	<slot name="editor" />
</div>
