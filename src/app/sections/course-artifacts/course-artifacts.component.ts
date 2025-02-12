import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';

@Component({
  selector: 'app-course-artifacts',
  imports: [CommonModule],
  templateUrl: './course-artifacts.component.html',
  styleUrl: './course-artifacts.component.css',
})
export class CourseArtifactsComponent implements OnInit {
  repos = signal<any[]>([]);
  originalRepos: any[] = [];
  selectedLanguage = signal<string>('');

  constructor(private readonly githubService: GithubService) {}

  ngOnInit(): void {
    this.githubService.getRepos().subscribe({
      next: (data) => {
        this.originalRepos = data;
        this.repos.set(data.slice(0, 6)); // Initialize with all repos
      },
      error: (err) => console.error('Error fetching repos', err),
    });
  }

  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedLanguage.set(target.value);
    this.applyFilters();
  }

  applyFilters(): void {
    let filteredRepos = [...this.originalRepos];

    // If a language is selected, filter the repos
    if (this.selectedLanguage()) {
      filteredRepos = filteredRepos.filter(
        (repo) =>
          repo.language &&
          repo.language.toLowerCase() === this.selectedLanguage().toLowerCase()
      );
    }

    this.repos.set(filteredRepos);
  }

  programmingLanguages(): string[] {
    // Extract unique language names from repos
    const languages = new Set(
      this.originalRepos.map((repo) => repo.language).filter(Boolean)
    );
    return Array.from(languages).sort((a, b) => a.localeCompare(b));
  }
}
// Compare this snippet from src/app/sections/course-artifacts/course-artifacts.component.html:
