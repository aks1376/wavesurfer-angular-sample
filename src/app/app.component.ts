import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'WavesurferAngularSample';
  audioUrl!: string;

  onAddAudioFile(event: Event) {
    if (event) {
      const files = (event.target as HTMLInputElement).files;
      if (files && files.length !== 0) {
        this.audioUrl = URL.createObjectURL(files[0]);
      }
    }
  }
}
