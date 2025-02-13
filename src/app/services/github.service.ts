import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', //singleton service
})
export class GithubService {
  private readonly repoUrl: string = `https://api.github.com/users/${environment.githubUsername}/repos`;

  constructor(private readonly http: HttpClient) { }

  getRepos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.repoUrl}?per_page=100`).pipe(
      mergeMap((repos) => {
        const totalPages = Math.ceil(repos.length / 100);
        const requests = [];

        for (let page = 2; page <= totalPages; page++) {
          requests.push(this.http.get<any[]>(`${this.repoUrl}?per_page=100&page=${page}`));
        }

        return forkJoin([this.http.get<any[]>(`${this.repoUrl}?per_page=100`), ...requests]).pipe(
          map((responses) => responses.flat())
        );
      })
    );
  }

}
