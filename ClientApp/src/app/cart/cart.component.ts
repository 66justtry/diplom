import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DateService } from '../services/date.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
    public sessionId: number = 0;
    public isLoading = true;
    public isPaymentActive = false;
    public sessionDate: string = '';
    public sessionTime: string = '';
    public resultDate: string = '';
    public resultTime: string = '';
    public count: number = 0;
    public sum: number = 0;
    public seatMatrix: SeatFull[][] = [];
    public typeArray: number[] = [];
    public takenSeats: SeatFull[] = [];
    public resultSeats: SeatResult[] = [];
    public cart: CartSessionFull | null = null;
    public isOk = false;
    public isError = false;
    
    getMovie(): void {
        this.http.get<CartSessionFull>(environment.apiUrl + '/cart/' + this.sessionId).subscribe(result => {
          this.cart = result;
          for (let s of this.cart.seats) {
            s.isClicked = false;
            s.isTooltipVisible = false;
          }
          this.sessionDate = this.dateService.getDayNameShort(this.cart.dateTime);
          this.resultDate = this.dateService.getDay(this.cart.dateTime);
          let endDate = new Date(this.cart.dateTime);
          endDate.setMinutes(endDate.getMinutes() + this.cart.duration);
          this.sessionTime = this.dateService.getTime(this.cart.dateTime) + ' - ' + this.dateService.getTime(endDate);
          this.resultTime = this.dateService.getTime(this.cart.dateTime);
          for (let i = 1; ; i++) {
            let arr = this.cart.seats.filter(e => e.row === i);
            if (arr.length === 0)
                break;
            this.seatMatrix.push(arr);
          }
          const pricesSet = new Set(this.cart.seats.map(x => x.price));
          this.typeArray = Array.from(pricesSet);
          this.isLoading = false;
        }, () => {this.isLoading = false;});
    }
    
    cellClick(seat: SeatFull) {
        if (seat.isTaken)
            return;
        let pos = this.takenSeats.findIndex(x => x === seat);
        if (pos === -1) {
            this.takenSeats.push(seat);
            seat.isClicked = true;
            this.sum += seat.price;
            this.count++;
        }
        else {
            this.takenSeats.splice(pos, 1);
            seat.isClicked = false;
            this.sum -= seat.price;
            this.count--;
        }
    }
    
    removeFromTicket(seat: SeatFull) {
        let pos = this.takenSeats.findIndex(x => x === seat);
        this.takenSeats.splice(pos, 1);
        seat.isClicked = false;
        this.sum -= seat.price;
        this.count--;
    }
    
    ngOnInit(): void {
        this.isPaymentActive = false;
        this.isOk = false;
        this.isError = false;
        this.count = 0;
        this.sum = 0;
        this.takenSeats = [];
        this.resultSeats = [];
        this.route.params.subscribe(params => {
          this.sessionId = +params['id'];
          this.isLoading = true;
          this.getMovie();
        });
    }
    
    showTooltip(s: SeatFull) {
        s.isTooltipVisible = true;
      }
      
    hideTooltip(s: SeatFull) {
        s.isTooltipVisible = false;
    }
    
    openPayment() {
        if (this.count === 0)
            return;
        this.setIsPaymentActive(true);
    }
      
    setIsPaymentActive(val: boolean) {
        this.isPaymentActive = val;
    }
    
    createOrder(phone: string) {
        this.http.post(environment.apiUrl + '/orders', {'sessionId': this.sessionId, 'phone': phone, 'sum': this.sum, 'seatIds': this.takenSeats.map(x => x.id)}).subscribe(result => {
            for (let seat of this.takenSeats) {
                this.resultSeats.push(new SeatResult(seat.row, seat.place));
            }
            this.isPaymentActive = false;
            this.isOk = true;
        }, () => { this.isPaymentActive = false; this.isError = true; });
    }
    
    constructor(private dateService: DateService, private route: ActivatedRoute, private http: HttpClient) {
    }
}

interface CartSessionFull {
    id: number;
    name: string;
    photoUrl: string;
    dateTime: Date;
    duration: number;
    videoTypeName: string;
    hallName: string;
    seats: SeatFull[];
}

interface SeatFull {
    id: number;
    name: string;
    row: number;
    place: number;
    price: number;
    isTaken: boolean;
    isClicked: boolean;
    isTooltipVisible: boolean;
}

class SeatResult {
    row: number;
    place: number;
    constructor(r: number, p: number) {
        this.row = r;
        this.place = p;
    }
}