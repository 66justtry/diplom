import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateChangeService {
  private dateSource = new Subject<Date>();
  currentDate = this.dateSource.asObservable();

  changeDate(date: Date) {
    this.dateSource.next(date);
  }
}