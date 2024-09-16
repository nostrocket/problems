<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type NDKSvelte from '@nostr-dev-kit/ndk-svelte';
	import { NDKEvent } from '@nostr-dev-kit/ndk';
	import { currentUser, devmode } from '@/stores/session';
	import Login from '../../components/Login.svelte';
	import { ndk } from '@/ndk';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import TextareaField from '../../components/TextareaField.svelte';
	import { onDestroy } from 'svelte';
	import type { NDKEventStore } from '@nostr-dev-kit/ndk-svelte';
	import { generateRandomHex } from '@/utils';

	let problems: NDKEventStore<NDKEvent> | undefined;
	onDestroy(() => {
		problems?.unsubscribe();
	});

	problems = $ndk.storeSubscribe([{ kinds: [31971 as number] }], { subId: 'rockets' });

	let tldr: string = '';
	let para: string = '';
	let child_status: 'rfm' | 'open' = 'rfm';

	function validateInputs(tldr: string, para: string) {
		const errors = {
			tldr: '',
			para: ''
		};

		if (tldr.length > 140) {
			errors.tldr = 'TLDR must be 140 characters or less';
		}
		if (para.length > 560) {
			errors.para = 'Paragraph must be 560 characters or less';
		}

		return errors;
	}

	$: errors = validateInputs(tldr, para);
	$: isValid = !errors.tldr && !errors.para;

	function publish(ndk: NDKSvelte) {
		if (!ndk.signer) {
			throw new Error('no ndk signer found');
		}
		let author = $currentUser;
		if (!author) {
			throw new Error('no current user');
		}

		if (!isValid) {
			throw new Error('input is not valid');
		}

		let e = new NDKEvent(ndk);
		e.author = author;
		e.kind = 31971;
		e.tags.push(['d', generateRandomHex(32)]);
		e.tags.push(['tldr', tldr]);
		e.tags.push(['para', para]);
		e.tags.push(['child_status', child_status]);
		e.publish().then((x) => {
			console.log(x);
		});
	}
</script>

<div class="flex flex-col gap-4">
	<main class="grid w-full flex-1 grid-cols-1 items-start gap-4 sm:grid-cols-3 md:gap-2">
		<Card.Root class="sm:col-span-3">
			<Card.Header class="pb-3">
				<Card.Title>Problem Tracker</Card.Title>
			</Card.Header>
			<Card.Content>
				<Dialog.Root>
					<Dialog.Trigger>
						<Button>Create a problem</Button>
					</Dialog.Trigger>
					<Dialog.Content class="modal sm:max-w-[625px]">
						<Dialog.Header>
							<Dialog.Title>New problem</Dialog.Title>
						</Dialog.Header>
						<TextareaField
							title="Title"
							bind:value={tldr}
							errorText={errors.tldr}
							options={{
								placeholder: 'Enter a brief description (max 140 characters)',
								style: 'height: 80px;'
							}}
						/>
						<TextareaField
							title="Description"
							bind:value={para}
							errorText={errors.para}
							options={{
								placeholder: 'Enter a detailed description (max 560 characters)',
								style: 'height: 200px;'
							}}
						/>
						<div>Child status upon creation</div>
						<RadioGroup.Root bind:value={child_status} class="flex">
							<div class="flex items-center space-x-2">
								<RadioGroup.Item value="rfm" id="r1" />
								<Label for="r1">RFM</Label>
							</div>
							<div class="flex items-center space-x-2">
								<RadioGroup.Item value="open" id="r2" />
								<Label for="r2">Open</Label>
							</div>
							<RadioGroup.Input name="spacing" />
						</RadioGroup.Root>
						<Dialog.Footer>
							{#if $currentUser}
								<Button
									disabled={!tldr || !para || !isValid}
									on:click={() => publish($ndk)}
									type="submit">Publish</Button
								>
							{:else}
								<Login />
							{/if}
						</Dialog.Footer>
					</Dialog.Content>
				</Dialog.Root>
				{#if $problems && $devmode}
					<Button variant="outline" on:click={() => console.log($problems)}>
						Print Problems to Console
					</Button>
				{/if}
			</Card.Content>
			<Card.Footer></Card.Footer>
		</Card.Root>
	</main>
</div>
