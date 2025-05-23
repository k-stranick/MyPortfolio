import { Component, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';

interface VideoSelection {
  src: string | null;
  type: string | null;
}
@Component({
  selector: 'app-demonstrations',
  standalone: true,
  imports: [NgIf, NgFor, YouTubePlayerModule],
  templateUrl: './demonstrations.component.html',
  styleUrl: './demonstrations.component.css'
})
export class DemonstrationsComponent {

  // List of demo videos
  videoList = [
    { name: 'Skyrend', src: 'https://youtu.be/c2DYt4gWh3E+', type: 'youtube' },
    { name: 'Weather App', src: 'https://youtu.be/6SQazBvp30E', type: 'youtube' },
    { name: 'Data Form', src: 'https://youtu.be/oVOpmv6qgI0', type: 'youtube' },
  ];

  /**
     * Signal to track the selected video.
     *
     * This signal holds the details of the currently selected video, including its source URL and type.
     * It is used to update the video player component to display the selected video.
     *     - `src`: The source URL of the selected video.
     *     - `type`: The type of video (e.g., 'youtube', 'vimeo', etc.).
     * The signal is initialized with an object containing `src` and `type` properties set to `null`.
     * The signal can be accessed using the `selectedVideo()` method, which returns the current value of the signal.
     * 
     * Usage:
     * -------------------------------------------------------------------------
     * - In the component (e.g., demonstrations.component.ts):
     * selectedVideo = signal<{ src: string | null, type: string | null }>({ src: null, type: null });
     *
     * - In the template (e.g., demonstrations.component.html):
     * <div *ngIf="selectedVideo()?.src && selectedVideo()?.type === 'youtube'" class="video-display">
     *   <youtube-player [videoId]="getYouTubeVideoId(selectedVideo()?.src) ?? ''" suggestedQuality="highres"></youtube-player>
     * </div>
     */
  selectedVideo = signal<VideoSelection>({ src: null, type: null });

  /**
     * Handles the change event for the video selection dropdown.
     *
     * This method is triggered when the user selects a different video from the dropdown menu.
     * It updates the `selectedVideo` signal with the details of the selected video.
     *
     * @param event - The event object representing the change event.
     *                It is expected to be an instance of `Event` and contains the target element.
     *
     * Usage:
     * -------------------------------------------------------------------------
     * - In the template (e.g., demonstrations.component.html):
     * <select id="videoSelect" class="form-select w-auto d-inline-block" (change)="onVideoChange($event)">
     *   <option value="">Select a demo</option>
     *   <option *ngFor="let video of videoList" [value]="video.src">
     *     {{ video.name }}
     *   </option>
     * </select>
     *
     * - In the component (e.g., demonstrations.component.ts):
     * onVideoChange(event: Event): void {
     *   const target = event.target as HTMLSelectElement;
     *   const selectedOption = this.videoList.find(video => video.src === target.value);
     *   this.selectedVideo.set(selectedOption ? { src: selectedOption.src, type: selectedOption.type } : { src: null, type: null });
     * }
     */
  onVideoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedOption = this.videoList.find(video => video.src === target.value);

    this.selectedVideo.set(selectedOption ? { src: selectedOption.src, type: selectedOption.type } : { src: null, type: null });
  }

  /**
     * Clears the selected video.
     *
     * This method resets the `selectedVideo` signal to its initial state, effectively clearing the selected video.
     *
     * Usage:
     * -------------------------------------------------------------------------
     * - In the template (e.g., demonstrations.component.html):
     * <button class="btn" (click)="clearVideo()">Clear Video</button>
     */
  clearVideo(): void {
    this.selectedVideo.set({ src: null, type: null });
  }

  /**
     * Extracts the YouTube video ID from a given URL.
     *
     * This method uses a regular expression to extract the video ID from various YouTube URL formats.
     *
     * @param url - The YouTube URL from which to extract the video ID.
     * @returns The extracted video ID as a string, or an empty string if the URL is invalid.
     *
     * Usage:
     * -------------------------------------------------------------------------
     * - In the template (e.g., demonstrations.component.html):
     * <youtube-player [videoId]="getYouTubeVideoId(selectedVideo()?.src) ?? ''" suggestedQuality="highres"></youtube-player>
     */
  getYouTubeVideoId(url: string | null | undefined): string {
    if (!url) return ''; // Ensure we always return a string

    // Updated regex to handle multiple YouTube link formats
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:.*[?&]v=|embed\/|v\/))([^"&?\/\s]{11})/;
    const match = regExp.exec(url || '');

    return match ? match[1] : ''; // Always return a valid string
  }


}
