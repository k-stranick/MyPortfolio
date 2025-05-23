import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./sections/intro/intro.component').then(m => m.IntroComponent),
    },
    {
        path: 'about',
        loadComponent: () => import('./sections/about/about.component').then(m => m.AboutComponent),
    },
    {
        path: 'awards',
        loadComponent: () => import('./sections/awards/awards.component').then(m => m.AwardsComponent),
    },
    {
        path: 'contact',
        loadComponent: () => import('./sections/contact/contact.component').then(m => m.ContactComponent),
    },
    {
        path: 'course-artifacts',
        loadComponent: () => import('./sections/course-artifacts/course-artifacts.component').then(m => m.CourseArtifactsComponent),
    },
    {
        path: 'cover-letter',
        loadComponent: () => import('./sections/cover-letter/cover-letter.component').then(m => m.CoverLetterComponent),
    },
    {
        path: 'demonstrations',
        loadComponent: () => import('./sections/demonstrations/demonstrations.component').then(m => m.DemonstrationsComponent),
    },

    {
        path: 'references',
        loadComponent: () => import('./sections/references/references.component').then(m => m.ReferencesComponent),
    },
    {
        path: 'resume',
        loadComponent: () => import('./sections/resume/resume.component').then(m => m.ResumeComponent),
    },
];