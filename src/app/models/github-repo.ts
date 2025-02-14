export interface GithubRepo {
    id: number;
    name: string;
    language: string | null;
    stargazers_count: number;
    html_url: string;
    description: string | null;
}


