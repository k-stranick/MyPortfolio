import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  navLinks = [
    { label: 'About Me', anchor: '#about-me' },
    { label: 'Resume', anchor: '#resume' },
    { label: 'Cover Letter', anchor: '#cover-letter' },
    { label: 'Projects', anchor: '#projects' },
    { label: 'Awards', anchor: '#awards' },
    { label: 'References', anchor: '#references' },
    { label: 'Contact', anchor: '#contact' },
  ];

  scrollToSection(sectionId: string) {
    const element = document.querySelector(sectionId);
    if (element) {
      const offSet = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: elementPosition - offSet,
        behavior: 'smooth',
      });
    }

    this.closeNavBar();
  }

  private closeNavBar() {
    const navbar = document.getElementById('mainNavbar');
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show'); // Hides Bootstrap's navbar
    }
  }
}
