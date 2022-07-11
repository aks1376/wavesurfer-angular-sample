import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';
import { TimeService } from '../services/time.service';

@Component({
  selector: 'app-wavesurfer',
  templateUrl: './wavesurfer.component.html',
  styleUrls: ['./wavesurfer.component.scss']
})
export class WavesurferComponent implements OnInit, OnDestroy {
  @ViewChild('currentTimeRef') currentTimeRef!: ElementRef<HTMLParagraphElement>;

  @Input('audioUrl') set setAudioUrl(audioUrl: string) {
    if (audioUrl) {
      this.loadAudioUrl(audioUrl);
    }
  }

  waveSurfer!: WaveSurfer;
  audioDurationHuman = '00:00:00';

  constructor(private timeService: TimeService) {
  }

  ngOnInit(): void {
    this.createWaveSurfer();
    this.playWhenReady();
    this.playAudioProgress();
  }

  ngOnDestroy(): void {
    if (this.waveSurfer) {
      this.waveSurfer.destroy()
    }
  }

  createWaveSurfer() {
    this.waveSurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: 'violet',
      progressColor: 'purple'
    });
  }

  playWhenReady() {
    this.waveSurfer.on('ready', () => {
      this.onPlayPause();
      this.displayAudioDuration();
    });
  }

  playAudioProgress() {
    this.waveSurfer.on('audioprocess', (currentPlayTime: number) => {
      this.displayCurrentPlayTime(currentPlayTime);
    });
  }

  displayCurrentPlayTime(currentTime: number) {
    const currentTimeHuman = this.timeService.formatSecondsToHumanString(currentTime);
    this.currentTimeRef.nativeElement.textContent = currentTimeHuman;
  }

  displayAudioDuration() {
    const duration = this.waveSurfer.getDuration();
    this.audioDurationHuman = this.timeService.formatSecondsToHumanString(duration);
  }

  loadAudioUrl(url: string) {
    this.waveSurfer.load(url);
  }

  onPlayPause() {
    this.waveSurfer.playPause();
  }

}
