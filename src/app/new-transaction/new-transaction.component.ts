import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {
  newTransactionForm;
  types: string[] = ['Expense', 'Income', 'Savings'];
  chosenType: string = this.types[0]; // default selected
  people: string[] = ['Augusto', 'Camila', 'Both'];
  categories: string[] = ['Home', 'Car', 'Entertainment', 'Utility'];

  constructor(private formBuilder: FormBuilder) {
    this.newTransactionForm = new FormGroup({
      type: new FormControl('', Validators.required),
      who: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.pattern('^\d{1,2}\/\d{1,2}\/\d{4}$')),
      value: new FormControl(''),
      notes: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(transactionData) {
    this.newTransactionForm.reset();

    // TODO: Reset validation warnings after reset!

    console.log('Transaction submitted!', transactionData)
  }
}
