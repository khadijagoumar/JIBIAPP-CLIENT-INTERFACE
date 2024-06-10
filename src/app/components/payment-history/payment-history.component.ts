import { Component, OnInit } from '@angular/core';
import { PaymentHistoryService } from '../../services/payment-history.service';

@Component({
  selector: 'app-payment-history',
  templateUrl: './payment-history.component.html',
  styleUrls: ['./payment-history.component.css']
})
export class PaymentHistoryComponent implements OnInit {
  paymentHistory: any[] = [];

  constructor(private paymentHistoryService: PaymentHistoryService) { }

  ngOnInit(): void {
    this.paymentHistoryService.getPaymentHistory().subscribe(history => {
      this.paymentHistory = history;
    });
  }
}
