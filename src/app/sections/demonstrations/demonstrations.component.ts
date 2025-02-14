import { Component, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-demonstrations',
  imports: [NgIf, NgFor],
  templateUrl: './demonstrations.component.html',
  styleUrl: './demonstrations.component.css'
})
export class DemonstrationsComponent {

  // List of demo videos
  videoList = [
    { name: 'Skyrend', src: 'assets/videos/skyrend.mp4' },
    { name: 'Weather App', src: 'assets/videos/weather.mp4' },
    { name: 'Data Form', src: 'assets/videos/dataForm.mp4' },
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
