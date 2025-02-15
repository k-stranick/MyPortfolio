import { Component, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-demonstrations',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './demonstrations.component.html',
  styleUrl: './demonstrations.component.css'
})
export class DemonstrationsComponent {

  // List of demo videos
  videoList = [
    { name: 'Skyrend', src: 'assets/videos/skyrendc.mp4' },
    { name: 'Weather App', src: 'assets/videos/weatherc.mp4' },
    { name: 'Data Form', src: 'assets/videos/dataFormc.mp4' },
  ];

  //Signal to track the selected video
  selectedVideo = signal<string | null>(null);

  onVideoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedVideo.set(target.value || null);
  }

  clearVideo(): void {
    this.selectedVideo.set(null);
  }
}
