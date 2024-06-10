import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentHistoryService {
  private paymentHistory: any[] = [];

  getPaymentHistory(): Observable<any[]> {
    return of(this.paymentHistory);
  }

  addPayment(payment: any): void {
    this.paymentHistory.push(payment);
  }
}
