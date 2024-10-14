import { Problem } from '@/event_helpers/problems';
import { ndk } from '@/ndk';
import { derived, get, writable } from 'svelte/store';

const _problems = get(ndk).storeSubscribe([{ kinds: [31971 as number] }], { subId: 'problems' });

export const problems = derived(_problems, ($problems) =>
	$problems.map(Problem.fromEvent).filter((problem) => problem.isValid())
);

export let selected = writable<Problem | undefined>(undefined);

export let bloom = writable(false); //todo: use a bloom filter from HH for problems that current user has already viewed, this should run on problem event ID not d-tag so that they see updates
