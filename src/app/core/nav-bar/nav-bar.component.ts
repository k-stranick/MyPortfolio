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
    { label: 'Demos', anchor: '#demos' },
    { label: 'Awards', anchor: '#awards' },
    { label: 'References', anchor: '#references' },
    { label: 'Contact', anchor: '#contact' },
  ];

  /**
   * Scrolls to the section of the page corresponding to the provided ID.
   *
   * This method is triggered by a user clicking on a navigation link. It scrolls the page
   * to the section of the page with the corresponding ID, then emits an event to notify
   * the parent component that the content has been toggled.
   *
   * @param sectionId - The ID of the section to scroll to.
   *
   * Usage:
   * -------------------------------------------------------------------------
   * - In the parent template (e.g., app.component.html):
   * <app-nav-bar (contentToggled)="onContentToggled($event)"></app-nav-bar>
   *
   * - In the parent component (e.g., app.component.ts):
   * onContentToggled(isVisible: boolean): void {
   *   -Conditionally show or hide other parts of the page
   * }
   */
  scrollToSection(sectionId: string) {
    const setTimeOutValue = 100; // milliseconds
    this.contentToggled.emit(true);

    setTimeout(() => {
      const element = document.querySelector(sectionId);
      if (element) {
        // Get the height of the navbar using its id
        const navbarHeight = document.querySelector('#navBar')?.clientHeight ?? 0;

        // calculates the position of the element
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
          top: elementPosition - navbarHeight,
          behavior: 'smooth',
        });
      }
    }, setTimeOutValue);

    this.closeNavBar();
  }

  private closeNavBar() {
    const navbar = document.getElementById('mainNavbar');
    if (navbar?.classList.contains('show')) {
      navbar.classList.remove('show'); // Hides Bootstrap's navbar
    }
  }
}
