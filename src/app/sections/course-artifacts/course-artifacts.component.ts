import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { GithubRepo } from '../../models/github-repo';

@Component({
  selector: 'app-course-artifacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-artifacts.component.html',
  styleUrl: './course-artifacts.component.css',
})

export class CourseArtifactsComponent implements OnInit {
  // class properties
  /** Holds the filtered repositories */
  repos = signal<GithubRepo[]>([]);
  /** Stores all original repositories fetched from GitHub */
  originalRepos: GithubRepo[] = [];
  /** Tracks the selected programming language */
  selectedLanguage = signal<string>('');


  constructor(private readonly githubService: GithubService) { }


  /**
   * Fetches repositories from GitHub when the component initializes.
   */
  ngOnInit(): void {
    this.githubService.getRepos().subscribe({
      next: (data) => {
        this.originalRepos = data ?? [];
      },
      error: (err) => console.error('Error fetching repos', err),
    });
  }


  /**
  * Updates the selected language and applies filtering.
  * @param event - The event triggered by changing the language dropdown.
  */
  onLanguageChange(event: Event): void {
    this.selectedLanguage.set((event.target as HTMLSelectElement).value);
    this.applyFilters();
  }


  /**
    * Applies filters to the repositories based on the selected language.
    */
  private applyFilters(): void {
    const selectedLang = this.selectedLanguage().trim().toLowerCase();

    // If "Select a language" (empty value) is chosen, hide all projects
    if (!selectedLang) {
      this.repos.set([]); // Clear displayed repositories
      return;
    }

    if (selectedLang === 'all') {
      this.sortAndSetRepos(this.originalRepos);
      return;
    }

    // Otherwise, filter repositories based on language
    const filteredRepos = this.originalRepos.filter(
      repo => (repo.language?.toLowerCase() ?? '') === selectedLang
    );

    this.sortAndSetRepos(filteredRepos);
  }

  /**
 * Clears the selected language filter and hides all repositories.
 * Resets the dropdown selection.
 */
  clearFilter(): void {
    this.selectedLanguage.set('');
    this.repos.set([]); // Clears displayed repositories

    // Reset dropdown selection to Select a language whose value = ''
    const selectElement = document.getElementById('language') as HTMLSelectElement;
    if (selectElement) selectElement.value = '';
  }


  /**
 * Sorts the repositories by the number of stars in descending order and sets the repos signal.
 *
 * @param repos - The array of repositories to be sorted and set.
 */
  private sortAndSetRepos(repos: any[]): void {
    this.repos.set([...repos].sort((a, b) => b.stargazers_count - a.stargazers_count));
  }


  /**
   * Extracts unique programming languages from the repository list.
   * @returns An array of unique programming languages sorted alphabetically.
   */
  programmingLanguages(): Array<string> {
    if (!this.originalRepos || this.originalRepos.length === 0)
      return [];

    return Array.from(
      new Set(this.originalRepos.map(repo => repo.language ?? '').filter(language => language.trim() !== ''))
    ).sort((a, b) => a.localeCompare(b));
  }
}
// Compare this snippet from src/app/sections/course-artifacts/course-artifacts.component.html:
