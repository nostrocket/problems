import { NDKEvent } from '@nostr-dev-kit/ndk';

// https://github.com/nostrocket/NIPS/blob/main/Problems.md
export class Problem {
	public readonly event: NDKEvent;

	constructor(
		event: NDKEvent,
		public dtag: string,
		public atag: string,
		public tldr: string,
		public para: string,
		public page: string,
		public child_status: 'rfm' | 'open'
	) {
		this.event = event;
	}

	parents(): string[] {
		let p: string[] = [];
		for (let t of this.event.getMatchingTags('a')) {
			if (t.length == 3 && t[2] == 'parent') {
				let s = t[1].split(':');
				if (s.length == 3 && s[0] == '31971') {
					p.push(s[2]);
				}
			}
		}
		return p;
	}

	static fromEvent(event: NDKEvent): Problem {
		return new Problem(
			event,
			event.dTag ?? '',
			event.kind + ':' + event.pubkey + ':' + event.dTag,
			event.getMatchingTags('tldr')[0]?.[1] ?? '',
			event.getMatchingTags('para')[0]?.[1] ?? '',
			event.getMatchingTags('page')[0]?.[1] ?? '',
			event.getMatchingTags('child_status')[0]?.[1] as 'rfm' | 'open'
		);
	}

	// only for problem preview
	static fromObject({ tldr, para, page }: { tldr: string; para: string; page: string }): Problem {
		return new Problem(new NDKEvent(), '', '', tldr, para, page, 'rfm');
	}

	get creator(): string {
		return this.event.pubkey ?? '';
	}

	isValid(): boolean {
		return this.dtag !== '' && this.tldr !== '' && this.para !== '';
	}
}
