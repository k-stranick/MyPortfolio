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
  //properties
  repos = signal<any[]>([]);
  originalRepos: any[] = [];
  selectedLanguage = signal<string>('');

  constructor(private readonly githubService: GithubService) { }

  //TODO: add videos and images
  /**
    * Initializes the component by fetching repositories from the GitHub service.
    */
  ngOnInit(): void {
    this.githubService.getRepos().subscribe({
      next: (data) => {
        this.originalRepos = data;
        // this.sortAndSetRepos(data); // Initialize with all repos
      },
      error: (err) => console.error('Error fetching repos', err),
    });
  }


  /**
  * Handles the language change event from the dropdown.
  *
  * @param event - The event triggered by changing the language dropdown.
  */
  onLanguageChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedLanguage.set(target.value);
    this.applyFilters();
  }


  /**
    * Applies filters to the repositories based on the selected language.
    */
  private applyFilters(): void {
    let filteredRepos = [...this.originalRepos];

    // If a language is selected, filter the repos
    if (this.selectedLanguage()) {
      filteredRepos = filteredRepos.filter(
        (repo) =>
          repo.language &&
          repo.language.toLowerCase() === this.selectedLanguage().toLowerCase()
      );
    }

    this.sortAndSetRepos(filteredRepos);
  }


  /**
 * Sorts the repositories by the number of stars in descending order and sets the repos signal.
 *
 * @param repos - The array of repositories to be sorted and set.
 */
  private sortAndSetRepos(repos: any[]): void {
    repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
    this.repos.set(repos);
  }


  /**
 * Extracts unique programming languages from the repositories.
 *
 * @returns An array of unique programming languages sorted alphabetically.
 */
  programmingLanguages(): string[] {
    // Extract unique language names from repos
    const languages = new Set(
      this.originalRepos.map((repo) => repo.language).filter(Boolean)
    );
    return Array.from(languages).sort((a, b) => a.localeCompare(b));
  }
}
// Compare this snippet from src/app/sections/course-artifacts/course-artifacts.component.html:
