import { Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class TimeService {

  /**
  * convert seconds to hh:mm:ss format
  * @param seconds seconds
  */
  formatSecondsToHumanString(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    seconds = seconds - (hours * 3600);
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds - (minutes * 60));

    const hoursStr = String(hours).length === 1 ? `0${hours}` : `${hours}`;
    const minutesStr = String(minutes).length === 1 ? `0${minutes}` : `${minutes}`;
    const secondStr = String(seconds).length === 1 ? `0${seconds}` : `${seconds}`;

    return `${hoursStr}:${minutesStr}:${secondStr}`;
  }
}