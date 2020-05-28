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
  people: string[] = ['Augusto', 'Camila', 'Both'];
  categories: string[] = ['Home', 'Car', 'Entertainment', 'Utility'];

  constructor(private formBuilder: FormBuilder) {
    this.newTransactionForm = new FormGroup({
      type: new FormControl(''),
      who: new FormControl(''),
      category: new FormControl(''),
      title: new FormControl(''),
      date: new FormControl(''),
      value: new FormControl(''),
      notes: new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onSubmit(transactionData) {
    this.newTransactionForm.reset();

    console.log('Transaction submitted!', transactionData)
  }
}
