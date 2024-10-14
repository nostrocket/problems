<script lang="ts">
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '@/components/ui/badge';
	import { bitcoinTip } from '@/stores/bitcoin';
	import { devmode } from '@/stores/session';
	import { toggleMode } from 'mode-watcher';
	import Moon from 'svelte-radix/Moon.svelte';
	import Sun from 'svelte-radix/Sun.svelte';
	import Login from '../components/Login.svelte';
	import { HomeIcon } from 'lucide-svelte';

	let open = false;
	let expandSidebar = false;
</script>

<div class="grid min-h-screen w-full">
	<div class="flex h-dvh flex-col">
		<header class="flex h-14 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<Button
				on:click={() => {
					goto(`/`);
				}}><HomeIcon /></Button
			>
			{#if $devmode}
				<Button on:click={async () => await goto(`${base}/new/problem/`)}>Log New Problem</Button>
			{/if}
			<div class="flex w-full flex-1 items-center justify-end gap-2">
				<Badge class="flex h-9 max-w-16 shrink-0 items-center justify-center rounded-md"
					>{$bitcoinTip.height}</Badge
				>
				<Button on:click={toggleMode} variant="outline" size="icon" class="shrink-0">
					<Sun
						class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
					/>
					<Moon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
				<Login />
			</div>
		</header>
		<div class="flex flex-1 flex-col gap-4 overflow-hidden">
			<slot name="content"></slot>
		</div>
	</div>
</div>
