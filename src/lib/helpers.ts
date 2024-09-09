interface GitHubUrlParts {
	owner: string;
	repo: string;
	type?: 'issues' | 'pull';
	number?: string;
}

export class GitHubApiError extends Error {
	constructor(
		message: string,
		public status?: number
	) {
		super(message);
		this.name = 'GitHubApiError';
	}
}

export function parseGitHubUrl(url: URL): GitHubUrlParts {
	const parts = url.pathname.split('/').filter(Boolean);
	if (parts.length < 2) {
		throw new Error('Invalid GitHub URL');
	}
	return {
		owner: parts[0],
		repo: parts[1],
		type: parts[2] as 'issues' | 'pull' | undefined,
		number: parts[3]
	};
}

export async function parseProblem(problem: string): Promise<string | undefined> {
	if (!isGitHubIssuesOrPullUrl(problem)) {
		return undefined;
	}

	try {
		const { owner, repo, number } = parseGitHubUrl(new URL(problem));

		const apiURL = new URL(`https://api.github.com/repos/${owner}/${repo}/issues/${number}`);
		const response = await fetch(apiURL);
		if (!response.ok) {
			throw new GitHubApiError(`HTTP error! status: ${response.status}`, response.status);
		}

		const json = await response.json();
		return json.title;
	} catch (error) {
		console.error('Failed to parse problem:', error);
		return undefined;
	}
}

export function isGitHubIssuesOrPullUrl(str: string): boolean {
	try {
		const url = new URL(str);
		const { owner, repo, type, number } = parseGitHubUrl(url);
		return (
			url.hostname === 'github.com' &&
			!!owner &&
			!!repo &&
			!!type &&
			!!number &&
			['issues', 'pull'].includes(type) &&
			/^[1-9]\d*$/.test(number)
		);
	} catch {
		return false;
	}
}
