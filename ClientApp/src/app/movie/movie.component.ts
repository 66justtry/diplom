import { Component, Inject, OnInit, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DateService } from './../services/date.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  public isLoading = true;
  public isDropdownOpened = false;
  public hasSessions = false;
  public sessionsIndex = 0;
  public dateText = ''; //текст обраної дати (відображається)
  public dateButtons: string[] = []; //всі варіанти дат (для прихованого списку)
  public sessionsByDate: Map<Date, SessionShort[]> = new Map<Date, SessionShort[]>(); //дата - масив сесій
  public dates: Date[] = []; //дати з мапи - для доступу за індексом до мапи
  public currentSessions: SessionShort[] | undefined = []; //обрані сесії - для відображення списку
  public movie: MovieSessionFull | null = null;
  
  changeDropdown() {
    this.isDropdownOpened = !this.isDropdownOpened;
  }
  
  getMovie(movieId: number): void {
    this.http.get<MovieSessionFull>(environment.apiUrl + '/movies/' + movieId).subscribe(result => {
      this.movie = result;
      if (this.movie.sessions.length > 0) {
        for (let s of this.movie.sessions) {
          s.output = this.dateService.getTime(s.dateTime);
          s.isTooltipVisible = false;
        }
        let tempDate;
        let sessionArray;
        for (let s of this.movie.sessions) {
          if (this.sessionsByDate.size == 7)
            break;
          tempDate = this.dateService.getDateOnly(s.dateTime);
          sessionArray = this.sessionsByDate.get(tempDate);
          if (!sessionArray) {
            this.sessionsByDate.set(tempDate, [s]);
            this.dates.push(tempDate);
          }
          else {
            sessionArray.push(s);
          }
        }
        for (let s of this.sessionsByDate)
          this.dateButtons.push(this.dateService.getDayNameShort(s[0]));
        this.dateText = this.dateButtons[0];
        this.currentSessions = this.sessionsByDate.get(this.dates[0]);
        this.hasSessions = true;
      }
      else {
        this.hasSessions = false;
      }
      this.sessionsIndex = 0;
      this.isLoading = false;
    }, () => {this.isLoading = false;});
  }
  
  constructor(private dateService: DateService, private route: ActivatedRoute, private el: ElementRef, private http: HttpClient) {
  }
  
  setIndex(i: number): void {
    this.sessionsIndex = i;
    this.dateText = this.dateButtons[i];
    this.currentSessions = this.sessionsByDate.get(this.dates[i]);
  }
  
  setIsDropdownOpened(val: boolean): void {
    this.isDropdownOpened = val;
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let movieId = +params['id'];
      this.isLoading = true;
      this.getMovie(movieId);
    });
  }
  
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;

    if (!target.classList.contains('dropdown-item') && !target.classList.contains('dropdown') && !target.classList.contains('dropdown-span')) {
      this.isDropdownOpened = false;
    }
  }
  
  showTooltip(s: SessionShort) {
    s.isTooltipVisible = true;
  }
  
  hideTooltip(s: SessionShort) {
    s.isTooltipVisible = false;
  }
}

interface MovieSessionFull {
  id: number;
  name: string;
  age: number;
  photoUrl: number;
  year: number;
  nameOriginal: string;
  director: string;
  genre: string;
  duration: number;
  country: string;
  actors: string;
  info: string;
  sessions: SessionShort[];
}

interface SessionShort {
  id: number;
  videoTypeName: string;
  dateTime: Date;
  price: number;
  output: string;
  isTooltipVisible: boolean;
}
