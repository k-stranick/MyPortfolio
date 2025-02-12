import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root', //singleton service
})
export class GithubService {
  private readonly repoUrl: string = `https://api.github.com/users/${environment.githubUsername}/repos`;

  constructor(private readonly http: HttpClient) {}

  getRepos(): Observable<any> {
    return this.http.get<any>(this.repoUrl);
  }
}
