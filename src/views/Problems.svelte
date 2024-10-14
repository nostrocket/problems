<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	import { selected } from '@/stores/problems';
	import ProblemView from '../components/ProblemView.svelte';
	import MailList from '../layouts/MailList.svelte';
</script>

<Resizable.PaneGroup direction="horizontal" class="h-full items-stretch overflow-hidden">
	<Resizable.Pane defaultSize={30} minSize={30} maxSize={50}>
		<MailList></MailList>
	</Resizable.Pane>

	<Resizable.Handle withHandle />
	<Resizable.Pane maxSize={85}><ProblemView problem={$selected}></ProblemView></Resizable.Pane>
</Resizable.PaneGroup>
