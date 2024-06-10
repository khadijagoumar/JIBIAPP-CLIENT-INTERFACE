import { Component, OnInit } from '@angular/core';
import { PaymentHistoryService } from 'C:/Users/ORIGINAL SHOP/Desktop/JIBI-APP/HomePage-Client/src/app/services/payment-history.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {
  paymentHistory: any[] = [];

  constructor(private paymentHistoryService: PaymentHistoryService) { }

  ngOnInit(): void {
    this.paymentHistoryService.getPaymentHistory().subscribe(history => {
      this.paymentHistory = history;
    });
  }
}
