import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentHistoryService } from 'C:/Users/ORIGINAL SHOP/Desktop/JIBI-APP/HomePage-Client/src/app/services/payment-history.service';

@Component({
  selector: 'app-paiement-form',
  templateUrl: './effectuerpaiement.component.html',
  styleUrls: ['./effectuerpaiement.component.css']
})
export class EffectuerpaiementComponent implements OnInit {
  company: any;
  paymentForm: FormGroup;
  isHistoryShown = false;
  paymentHistory: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private paymentHistoryService: PaymentHistoryService
  ) {
    this.paymentForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    const companies = {
      "iam-recharges": {
        imgSrc: "https://www.iam.ma/ImagesMarocTelecom/Phototh%C3%A8que/Images-grandes/maroc-telecom-blanc-ar-grande.jpg",
        name: "IAM RECHARGES",
        fields: ["Nom et Prénom du donateur", "Montant du don (DH)"]
      },
       "iam-factures": {
        imgSrc: "https://www.iam.ma/ImagesMarocTelecom/Phototh%C3%A8que/Images-grandes/maroc-telecom-blanc-ar-grande.jpg",
        name: "IAM FACTURES",
        fields: ["Nom et Prénom du donateur", "Montant du don (DH)"]
      },
      "redal": {
        imgSrc: "https://media.licdn.com/dms/image/C511BAQFD_MZ6Chc1QQ/company-background_1536_768/0/1584028354410?e=2147483647&v=beta&t=gvvf396mzkaHgH7xzYheZrBPrkBNxGfgLSjZQ1w0UkQ",
        name: "REDAL",
        fields: ["Nom et Prénom du donateur", "Montant du don (DH)"]
      },
      "amendis-tanger": {
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIm3XBL01OW3dxqviMt3clLQdZq_p4-YqoG6YPP38HGA&s",
        name: "AMENDIS TANGER",
        fields: ["Nom et Prénom du donateur", "Montant du don (DH)"]
      },
      "amendis-tetouan": {
        imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIm3XBL01OW3dxqviMt3clLQdZq_p4-YqoG6YPP38HGA&s",
        name: "AMENDIS TETOUAN",
        fields: ["Nom et Prénom du donateur", "Montant du don (DH)"]
      }
    
    };

    this.activatedRoute.paramMap.subscribe(params => {
      const companyId = params.get('id');
      this.company = companies[companyId as keyof typeof companies];
      this.buildForm();
    });

    this.paymentHistoryService.getPaymentHistory().subscribe(history => {
      this.paymentHistory = history;
    });
  }

  buildForm() {
    const formGroup: any = {};
    if (this.company) {
      this.company.fields.forEach((field: string) => {
        formGroup[field] = ['', Validators.required];
      });
    }
    this.paymentForm = this.formBuilder.group(formGroup);
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      const formData = this.paymentForm.value;
      this.paymentHistoryService.addPayment({
        ...formData,
        creancierName: this.company.name,
        creancierLogo: this.company.imgSrc,
        transactionType: 'facture', // Adjust based on the company type if needed
        creanceAmount: formData["Montant du don (DH)"] // Adjust based on the input field name
      });
      this.router.navigate(['/facture-form'], {
        state: {
          data: formData,
          creancierName: this.company.name,
          creancierLogo: this.company.imgSrc,
          transactionType: 'facture', // Adjust based on the company type if needed
          creanceAmount: formData["Montant du don (DH)"] // Adjust based on the input field name
        }
      });
    }
  }

  showHistory() {
    this.isHistoryShown = true;
    this.paymentHistoryService.getPaymentHistory().subscribe(history => {
      this.paymentHistory = history;
    });
  }
}
