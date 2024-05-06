import { Component } from '@angular/core';
import { DateChangeService } from '../services/date-change.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-date-button-div',
  templateUrl: './date-button-div.component.html',
  styleUrls: ['./date-button-div.component.css']
})
export class DateButtonDivComponent {
  public dateButtonInfo: DateInfo[] = [];
  public selectedIndex: number = 0;
  
  constructor(private dateChangeService: DateChangeService, private dateService: DateService) {
    this.selectedIndex = 0;
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date();
      currentDate.setDate(currentDate.getDate() + i);
      this.dateButtonInfo.push(new DateInfo(currentDate, this.dateService.getDay(currentDate), this.dateService.getDayNameFull(currentDate, i)));
    }
  }
  
  sendDate(date: Date, i: number) {
    this.selectedIndex = i;
    this.dateChangeService.changeDate(date);
  }
}

class DateInfo {
  date: Date;
  spanText1: string;
  spanText2: string;
  constructor(d: Date, s1: string, s2: string) {
    this.date = d;
    this.spanText1 = s1;
    this.spanText2 = s2;
  }
}
