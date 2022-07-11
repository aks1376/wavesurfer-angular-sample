import { Component, Input, OnInit } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wavesurfer',
  templateUrl: './wavesurfer.component.html',
  styleUrls: ['./wavesurfer.component.scss']
})
export class WavesurferComponent implements OnInit {

  @Input('audioUrl') set setAudioUrl(audioUrl: string) {
    if (audioUrl) {
      this.loadAudioUrl(audioUrl);
    }
  }

  wavesurfer!: WaveSurfer;

  constructor() {
  }

  ngOnInit(): void {
    this.createWaveSurfer();
    this.playWhenReady();
  }

  createWaveSurfer() {
    this.wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple'
    });
  }

  playWhenReady() {
    this.wavesurfer.on('ready', () => {
      this.wavesurfer.play();
    });
    this.wavesurfer.on('audioprocess', (event: any) => {
      console.log(event);
    });
  }

  loadAudioUrl(url: string) {
    this.wavesurfer.load(url);
  }

  onPlayPause() {
    this.wavesurfer.playPause();
  }


}
