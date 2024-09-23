import { NDKEvent } from '@nostr-dev-kit/ndk';

export class Problem {
	public readonly event: NDKEvent;

	constructor(
		event: NDKEvent,
		public dtag: string,
		public tldr: string,
		public para: string,
		public child_status: 'rfm' | 'open'
	) {
		this.event = event;
	}

	static fromEvent(event: NDKEvent): Problem {
		return new Problem(
			event,
			event.dTag ?? '',
			event.getMatchingTags('tldr')[0]?.[1] ?? '',
			event.getMatchingTags('para')[0]?.[1] ?? '',
			event.getMatchingTags('child_status')[0]?.[1] as 'rfm' | 'open'
		);
	}

	get creator(): string {
		return this.event.pubkey ?? '';
	}

	isValid(): boolean {
		return this.dtag !== '' && this.tldr !== '' && this.para !== '';
	}
}
