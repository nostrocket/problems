<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import Separator from '@/components/ui/separator/separator.svelte';
	import { commitInfo } from '@/stores/github';
	import { devmode } from '@/stores/session';
	import { Code, Pyramid } from 'lucide-svelte';
	import { GitAltBrand } from 'svelte-awesome-icons';

	export let closeSheet = () => {};

	let iconClass = 'h-5 w-5 md:h-4 md:w-4';

	$: getClass = (menuItem: string) => {
		if ($page.url.pathname.startsWith(`/${menuItem}`) || (menuItem == 'dev' && $devmode)) {
			return 'flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary';
		} else {
			return 'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary';
		}
	};
</script>

<a href="{base}/problems" class={getClass('problems')} on:click={closeSheet}>
	<Pyramid class={iconClass} />
	Problem Tracker
	<!-- <Badge class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">6</Badge> -->
</a>
<Separator class="dark:bg-slate-700" />
<a href="https://github.com/nostrocket/problems" target="_blank" class={getClass('_')}>
	<GitAltBrand class={iconClass} />
	Source
</a>
<Separator class="dark:bg-slate-700" />
<a
	href="##"
	class={getClass('dev')}
	on:click={() => {
		devmode.update((dm) => {
			return !dm;
		});
	}}
>
	<Code class={iconClass} />
	Dev Mode
</a>
<Separator class="dark:bg-slate-700" />
<span class="m-2 flex flex-col border border-orange-500 p-1 font-mono text-sm">
	<span class=" max-w-[200px] truncate text-nowrap">Commit: {$commitInfo.hash}</span>
	<span class=" text-nowrap">Height: {$commitInfo.count}</span>
</span>
