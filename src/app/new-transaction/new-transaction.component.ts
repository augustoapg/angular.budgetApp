import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {
  newTransactionForm;

  type: FormControl =  new FormControl('', Validators.required);
  who: FormControl =  new FormControl('', Validators.required);
  category: FormControl =  new FormControl('', Validators.required);
  title: FormControl =  new FormControl('', Validators.required);
  date: FormControl =  new FormControl('', Validators.required);
  value: FormControl =  new FormControl('');
  notes: FormControl =  new FormControl('');

  types: string[] = ['Expense', 'Income', 'Savings'];
  chosenType: string = this.types[0]; // default selected
  people: string[] = ['Augusto', 'Camila', 'Both'];
  categories: string[] = ['Home', 'Car', 'Entertainment', 'Utility'];

  constructor(private formBuilder: FormBuilder) {
    this.newTransactionForm = new FormGroup({
      type: this.type,
      who: this.who,
      category: this.category,
      title: this.title,
      date: this.date,
      value: this.value,
      notes: this.notes
    });
  }

  ngOnInit(): void {
  }

  onSubmit(transactionData) {
    this.newTransactionForm.reset();

    // TODO: Reset validation warnings after reset!
    this.chosenType = 'Expense'; // TODO: FIX THIS!

    console.log('Transaction submitted!', transactionData)
  }

  getErrorMessage(field) {
    if (field === 'type'){
      return 'Please select a type.';
    } else if (field === 'who') {
      return 'Please select a person.';
    } else if (field === 'category') {
      return 'Please select a category';
    } else if (field === 'title') {
      return 'Please select a title';
    } else if (field === 'date') {
      return 'Please select a date';
    } else if (field === 'value') {
      return 'Please select a value';
    }
    return 'Other error'
  }
}
