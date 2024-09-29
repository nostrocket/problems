<script lang="ts">
	import { Button } from '@/components/ui/button';
	import ScrollArea from '@/components/ui/scroll-area/scroll-area.svelte';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';
	import * as Card from '@/components/ui/card';
	import TextareaField from '../components/TextareaField.svelte';
	import * as RadioGroup from '@/components/ui/radio-group';
	import { currentUser } from '@/stores/session';
	import Login from '../components/Login.svelte';
	import { ndk } from '@/ndk';
	import type NDKSvelte from '@nostr-dev-kit/ndk-svelte';
	import { NDKEvent } from '@nostr-dev-kit/ndk';
	import { sha256 } from 'js-sha256';
	import { Label } from '@/components/ui/label';
	import { Carta, MarkdownEditor } from 'carta-md';
	import LogNewProblemLayout from '../layouts/LogNewProblemLayout.svelte';
	import 'carta-md/default.css';
	import ProblemView from '../components/ProblemView.svelte';
	import { Problem } from '@/event_helpers/problems';

	let tldr: string = '';
	let para: string = '';
	let page: string = '';
	let child_status: 'rfm' | 'open' = 'rfm';

	let isPublishing = false;

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
		if (isPublishing) return;
		isPublishing = true;

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
		const identify = sha256(author.pubkey + tldr);
		console.log('identify', identify);
		e.author = author;
		e.kind = 31971;
		e.tags.push(['d', identify]);
		e.tags.push(['tldr', tldr]);
		e.tags.push(['para', para]);
		if (page) {
			e.tags.push(['page', page]);
		}
		e.tags.push(['child_status', child_status]);
		e.publish()
			.then(async (x) => {
				console.log(x);
				tldr = '';
				para = '';
				child_status = 'rfm';
				isPublishing = false;
				await goto(`${base}/problems`);
			})
			.catch((error) => {
				console.error('Publish failed:', error);
				isPublishing = false;
			});
	}

	$: problem = Problem.fromObject({
		tldr,
		para,
		page
	});

	const carta = new Carta();
</script>

<LogNewProblemLayout>
	<div slot="editor">
		<ScrollArea class="h-[calc(100vh-64px)]">
			<div class="flex flex-col justify-start gap-2 p-4">
				<div class="text-3xl font-bold">Log New problem</div>
				<TextareaField
					title="Title"
					bind:value={tldr}
					errorText={errors.tldr}
					options={{
						placeholder: 'Enter a brief description (max 140 characters)',
						style: 'height: 60px;'
					}}
				/>
				<TextareaField
					title="Description"
					bind:value={para}
					errorText={errors.para}
					options={{
						placeholder: 'Enter a detailed description (max 560 characters)',
						style: 'height: 180px;'
					}}
				/>
				<div>One page describing the problem</div>
				<MarkdownEditor {carta} bind:value={page} mode="tabs" />
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
				{#if $currentUser}
					<Button
						disabled={!tldr || !para || !isValid || isPublishing}
						on:click={() => publish($ndk)}
						type="submit"
					>
						{isPublishing ? 'Publishing...' : 'Publish'}
					</Button>
				{:else}
					<Login />
				{/if}
			</div>
		</ScrollArea>
	</div>
	<div slot="preview">
		<ProblemView {problem} preview />
	</div>
</LogNewProblemLayout>
