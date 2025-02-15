import { Component, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { YouTubePlayer, YouTubePlayerModule } from '@angular/youtube-player';


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

  //Signal to track the selected video
  selectedVideo = signal<{ src: string | null, type: string | null }>({ src: null, type: null });
  // selectedVideo = signal<string | null>(null);

  onVideoChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedOption = this.videoList.find(video => video.src === target.value);
    this.selectedVideo.set(selectedOption ? { src: selectedOption.src, type: selectedOption.type } : { src: null, type: null });
  }

  clearVideo(): void {
    this.selectedVideo.set({ src: null, type: null });
  }
}
