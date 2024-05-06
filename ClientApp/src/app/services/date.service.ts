import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

@Injectable({
  providedIn: 'root',
})
export class DateService {
    datesArray: Date[] = [];
    monthNames: string[] = [
        'СІЧНЯ',
        'ЛЮТОГО',
        'БЕРЕЗНЯ',
        'КВІТНЯ',
        'ТРАВНЯ',
        'ЧЕРВНЯ',
        'ЛИПНЯ',
        'СЕРПНЯ',
        'ВЕРЕСНЯ',
        'ЖОВТНЯ',
        'ЛИСТОПАДА',
        'ГРУДНЯ',
    ];
    
    dayNamesShort: string[] = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

    public getTime(date: Date): string {
        let p = new DatePipe('en-US');
        return p.transform(new Date(date), 'HH:mm') || '';
    }
    
    public getDay(date: Date): string {
        let d = new Date(date);
        return d.getDate().toString() + ' ' + this.monthNames[d.getMonth()];
    }
    
    public getDayNameShort(date: Date): string {
        let temp = new Date(date);
        let d = new Date();
        d.setHours(0, 0, 0, 0);
        if (d.getDate() === temp.getDate())
            return 'СЬОГОДНІ';
        d.setDate(d.getDate() + 1);
        if (d.getDate() === temp.getDate())
            return 'ЗАВТРА';
        return this.dayNamesShort[temp.getDay()] + ', ' + this.getDay(date);
    }
    
    public getDayNameFull(date: Date, index: number): string {
        return index == 0 ? 'СЬОГОДНІ' : index == 1 ? 'ЗАВТРА' : format(date, 'EEEE', { locale: uk }).toUpperCase();
    }
    
    public getDateOnly(date: Date): Date {
        let d = new Date(date);
        d.setHours(0, 0, 0, 0);
        let res = this.datesArray.find(x => x.getDate() === d.getDate());
        if (!res) {
            this.datesArray.push(d);
            res = d;
        }
        return res;
    }
}