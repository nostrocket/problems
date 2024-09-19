import { NDKEvent } from '@nostr-dev-kit/ndk';

export class Problem {
	private readonly event: NDKEvent;

	constructor(
		event: NDKEvent,
		public identify: string,
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
		return this.identify !== '' && this.tldr !== '' && this.para !== '';
	}
}