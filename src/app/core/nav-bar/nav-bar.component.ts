import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  @Output() contentToggled = new EventEmitter<boolean>();

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
    this.contentToggled.emit(true);

    setTimeout(() => {
      const element = document.querySelector(sectionId);
      if (element && this.contentToggled) {
        // const offSet = 80;
        const navbarHeight =
          document.querySelector('.navbar')?.clientHeight ?? 0;

        const elementPosition =
          element.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: 'smooth',
        });
      }
    }, 100);

    this.closeNavBar();
  }

  private closeNavBar() {
    const navbar = document.getElementById('mainNavbar');
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show'); // Hides Bootstrap's navbar
    }
  }
}
