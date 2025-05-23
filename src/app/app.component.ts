import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './sections/contact/contact.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { IntroComponent } from './sections/intro/intro.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    CommonModule,
    NavBarComponent,
    IntroComponent,
    ContactComponent,
    FooterComponent
  ],
})
export class AppComponent {
  showContent = false;

  // Lazy load type definitions for each section
  aboutComponent: typeof import('./sections/about/about.component').AboutComponent | null = null;
  resumeComponent: typeof import('./sections/resume/resume.component').ResumeComponent | null = null;
  coverLetterComponent: typeof import('./sections/cover-letter/cover-letter.component').CoverLetterComponent | null = null;
  artifactsComponent: typeof import('./sections/course-artifacts/course-artifacts.component').CourseArtifactsComponent | null = null;
  demonstrationsComponent: typeof import('./sections/demonstrations/demonstrations.component').DemonstrationsComponent | null = null;
  awardsComponent: typeof import('./sections/awards/awards.component').AwardsComponent | null = null;
  referencesComponent: typeof import('./sections/references/references.component').ReferencesComponent | null = null;


  /**
   * Handles the display state of additional page content based on user interaction.
   *
   * This method is triggered by a child component (e.g., IntroComponent) that emits
   * a boolean value indicating whether the rest of the page should be shown. When
   * invoked, it updates the local `showContent` property to reflect the requested
   * state. If `isVisible` is true, it lazy loads additional components.
   *
   * @param isVisible - A boolean value that determines if additional content should be visible.
   *
   * Usage:
   * -------------------------------------------------------------------------
   * - In the child component (e.g., IntroComponent):
   * @Output() contentToggled = new EventEmitter<boolean>();
   *
   * toggleContent() {
   *   this.showContent = !this.showContent;
   *   this.contentToggled.emit(this.showContent);
   * }
   *
   * - In the parent template (e.g., app.component.html):
   * <app-intro (contentToggled)="onContentToggled($event)"></app-intro>
   *
   * - In AppComponent (the parent) itself:
   * async onContentToggled(isVisible: boolean): Promise<void> {
   *   this.showContent = isVisible;
   *
   *   if (isVisible) {
   *     this.aboutComponent = (await import('./sections/about/about.component')).AboutComponent;
   *     this.resumeComponent = (await import('./sections/resume/resume.component')).ResumeComponent;
   *     this.coverLetterComponent = (await import('./sections/cover-letter/cover-letter.component')).CoverLetterComponent;
   *     this.artifactsComponent = (await import('./sections/course-artifacts/course-artifacts.component')).CourseArtifactsComponent;
   *     this.demonstrationsComponent = (await import('./sections/demonstrations/demonstrations.component')).DemonstrationsComponent;
   *     this.awardsComponent = (await import('./sections/awards/awards.component')).AwardsComponent;
   *     this.referencesComponent = (await import('./sections/references/references.component')).ReferencesComponent;
   *   }
   * }
   */
  async onContentToggled(isVisible: boolean) {
    this.showContent = isVisible;

    if (isVisible) {
      //   this.aboutComponent = (await import('./sections/about/about.component')).AboutComponent;
      //   this.resumeComponent = (await import('./sections/resume/resume.component')).ResumeComponent;
      //   this.coverLetterComponent = (await import('./sections/cover-letter/cover-letter.component')).CoverLetterComponent;
      //   this.artifactsComponent = (await import('./sections/course-artifacts/course-artifacts.component')).CourseArtifactsComponent;
      //   this.demonstrationsComponent = (await import('./sections/demonstrations/demonstrations.component')).DemonstrationsComponent;
      //   this.awardsComponent = (await import('./sections/awards/awards.component')).AwardsComponent;
      //   this.referencesComponent = (await import('./sections/references/references.component')).ReferencesComponent;
      // }
      this.aboutComponent = await this.loadComponent<typeof import('./sections/about/about.component').AboutComponent>('./sections/about/about.component');
      this.resumeComponent = await this.loadComponent<typeof import('./sections/resume/resume.component').ResumeComponent>('./sections/resume/resume.component');
      this.coverLetterComponent = await this.loadComponent<typeof import('./sections/cover-letter/cover-letter.component').CoverLetterComponent>('./sections/cover-letter/cover-letter.component');
      this.artifactsComponent = await this.loadComponent<typeof import('./sections/course-artifacts/course-artifacts.component').CourseArtifactsComponent>('./sections/course-artifacts/course-artifacts.component');
      this.demonstrationsComponent = await this.loadComponent<typeof import('./sections/demonstrations/demonstrations.component').DemonstrationsComponent>('./sections/demonstrations/demonstrations.component');
      this.awardsComponent = await this.loadComponent<typeof import('./sections/awards/awards.component').AwardsComponent>('./sections/awards/awards.component');
      this.referencesComponent = await this.loadComponent<typeof import('./sections/references/references.component').ReferencesComponent>('./sections/references/references.component');
    }
  }

  private async loadComponent<T>(path: string): Promise<T> {
    return (await import(path)).default;
  }
}
