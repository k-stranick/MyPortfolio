import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css',
})
export class IntroComponent {
  @Output() contentToggled = new EventEmitter<boolean>();
  showContent = false;

  /**
   * Toggles the visibility of additional page content.
   *
   * This method flips the value of `showContent` between `false` and `true` each time it is called,
   * then emits the new state through the `contentToggled` EventEmitter. A parent component can
   * listen for this event to show or hide additional sections of the page.
   *
   * Usage:
   * -------------------------------------------------------------------------
   * In the parent template (e.g., app.component.html):
   * <app-intro (contentToggled)="onContentToggled($event)"></app-intro>
   *
   * In the parent component (e.g., app.component.ts):
   * onContentToggled(isVisible: boolean): void {
   *   -Conditionally show or hide other parts of the page
   * }
   */
  toggleContent() {
    this.showContent = !this.showContent;
    this.contentToggled.emit(this.showContent);
  }
}
