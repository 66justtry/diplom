import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-ok',
    templateUrl: './ok.component.html',
    styleUrls: ['./ok.component.css']
})
export class OkComponent {
  @Input() movie: string | undefined = '';
  @Input() hall: string | undefined = '';
  @Input() sessionDate: string = '';
  @Input() sessionTime: string = '';
  @Input() seats: SeatResult[] = [];
}
  
class SeatResult {
  row: number;
  place: number;
  constructor(r: number, p: number) {
      this.row = r;
      this.place = p;
  }
}