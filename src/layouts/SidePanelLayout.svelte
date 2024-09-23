<script lang="ts">
	import Menu from 'lucide-svelte/icons/menu';
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import NewMenu from '../components/Menu.svelte';
	import { base } from '$app/paths';
	import Login from '../components/Login.svelte';
	import { Badge } from '@/components/ui/badge';
	import { bitcoinTip } from '@/stores/bitcoin';
	import { AngleLeftSolid, AngleRightSolid } from 'svelte-awesome-icons';
	import LogNewProblem from '../components/LogNewProblem.svelte';

	let open = false;
	let expandSidebar = true;
</script>

<div
	class={`grid min-h-screen w-full ${expandSidebar ? 'md:grid-cols-[220px_1fr] lg:grid-cols-[260px_1fr]' : ''}`}
>
	<div class="hidden border-r bg-muted/40 md:block">
		{#if expandSidebar}
			<div class="flex h-full max-h-screen flex-col gap-2">
				<div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
					<a href="{base}/" class="flex items-center gap-2 font-semibold">
						<span class="">Problems</span>
					</a>
				</div>
				<div class="flex-1">
					<nav class="items-start px-2 text-sm font-medium lg:px-4">
						<NewMenu />
					</nav>
				</div>
				<button
					on:click={() => {
						expandSidebar = false;
					}}
					class="mb-2 flex transform items-center justify-center rounded-r-full bg-blue-500 px-4 py-2 font-semibold
					 text-white opacity-20 shadow-md transition
					  duration-300 ease-in-out hover:scale-105
						hover:bg-blue-600 hover:opacity-70 md:w-[180px] lg:w-[220px]"
				>
					<AngleLeftSolid />
					Close Sidebar
				</button>
			</div>
		{:else}
			<button
				on:click={() => {
					expandSidebar = true;
				}}
				class="absolute bottom-2 left-0 flex items-center justify-center rounded-r-full bg-green-500
				 px-4 py-2 font-semibold text-white
				 opacity-20 shadow-md transition
				 duration-300 ease-in-out hover:scale-105
				 hover:bg-green-600 hover:opacity-70 md:w-[180px] lg:w-[220px]"
			>
				Expand Sidebar
				<AngleRightSolid />
			</button>
		{/if}
	</div>
	<div class="flex h-dvh flex-col">
		<header class="flex h-14 items-center border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
			<div class="shrink-0 pr-4 md:hidden">
				<Sheet.Root bind:open>
					<Sheet.Trigger asChild let:builder>
						<Button variant="outline" size="icon" builders={[builder]}>
							<Menu class="h-5 w-5" />
							<span class="sr-only">Toggle navigation menu</span>
						</Button>
					</Sheet.Trigger>
					<Sheet.Content side="left" class="flex flex-col">
						<nav class="grid gap-2 text-lg font-medium">
							<a
								href="{base}/"
								class="flex items-center gap-2 text-lg font-semibold"
								on:click={() => (open = false)}
							>
								<span>Problems</span>
							</a>
							<NewMenu closeSheet={() => (open = false)} />
						</nav>
					</Sheet.Content>
				</Sheet.Root>
			</div>
			<LogNewProblem />
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
		<div class="flex flex-1 flex-col overflow-auto pt-2">
			<slot name="content"></slot>
		</div>
	</div>
</div>
