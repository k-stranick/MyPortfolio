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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular-portfolio';
}
