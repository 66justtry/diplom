import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  @Input() sum: number = 0;
  @Output() onReturn = new EventEmitter();
  @Output() onCommit = new EventEmitter();
  public phone: string = '';
  public cardNumber: string = '';
  public cardCode: string = '';
  public phoneSpan: string = '';
  public cardNumberSpan: string = '';
  public cardCodeSpan: string = '';
  public isSending = false;
  
  validate(): boolean {
    let res = true;
    const phoneRegex = /^\+38\d{10}$/;
    const cardNumberRegex = /^\d{16}$/;
    const cardCodeRegex = /^\d{3}$/;
    if (!phoneRegex.test(this.phone)) {
      this.phoneSpan = 'Номер телефону починається на +38 і далі 10 цифр';
      res = false;
    }
    else {
      this.phoneSpan = '';
    }
    if (!cardNumberRegex.test(this.cardNumber)) {
      this.cardNumberSpan = 'Номер карти - 16 цифр';
      res = false;
    }
    else {
      this.cardNumberSpan = '';
    }
    if (!cardCodeRegex.test(this.cardCode)) {
      this.cardCodeSpan = 'CVV код - 3 цифри';
      res = false;
    }
    else {
      this.cardCodeSpan = '';
    }
    return res;
  }
  
  send() {
    if (!this.validate())
      return;
    this.isSending = true;
    this.onCommit.emit(this.phone.substring(1));
  }
}