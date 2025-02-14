import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AboutComponent } from './sections/about/about.component';
import { ResumeComponent } from './sections/resume/resume.component';
import { CoverLetterComponent } from './sections/cover-letter/cover-letter.component';
import { CourseArtifactsComponent } from './sections/course-artifacts/course-artifacts.component';
import { AwardsComponent } from './sections/awards/awards.component';
import { ReferencesComponent } from './sections/references/references.component';
import { ContactComponent } from './sections/contact/contact.component';
import { FooterComponent } from './core/footer/footer.component';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { IntroComponent } from './sections/intro/intro.component';
import { CommonModule } from '@angular/common';
import { DemonstrationsComponent } from "./sections/demonstrations/demonstrations.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    AboutComponent,
    ResumeComponent,
    CoverLetterComponent,
    CourseArtifactsComponent,
    AwardsComponent,
    ReferencesComponent,
    ContactComponent,
    FooterComponent,
    NavBarComponent,
    IntroComponent,
    CommonModule,
    DemonstrationsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-portfolio';
  showContent = false;

  /**
   * Handles the display state of additional page content based on user interaction.
   *
   * This method is triggered by a child component (e.g., IntroComponent) that emits
   * a boolean value indicating whether the rest of the page should be shown. When
   * invoked, it updates the local `showContent` property to reflect the requested
   * state.
   *
   * @param showContent - A boolean value that determines if additional content should be visible.
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
   * onContentToggled(showContent: boolean): void {
   *   this.showContent = showContent;
   * }
   */
  onContentToggled(isVisible: boolean) {
    this.showContent = isVisible;
  }
}
