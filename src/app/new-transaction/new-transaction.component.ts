import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { TransactionService } from './transaction.service';
import { Transaction } from '../models/Transaction';
import { formatDate } from '@angular/common';
import { Category } from '../models/Category';
import { Subcategory } from '../models/Subcategory';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  providers: [TransactionService],
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {
  newTransactionForm;

  type: FormControl =  new FormControl('', Validators.required);
  who: FormControl =  new FormControl('', Validators.required);
  category: FormControl =  new FormControl('', Validators.required);
  subcategory: FormControl =  new FormControl('', Validators.required);
  title: FormControl =  new FormControl('', Validators.required);
  date: FormControl =  new FormControl((new Date()).toISOString(), Validators.required);
  value: FormControl =  new FormControl('', Validators.min(0.01));
  notes: FormControl =  new FormControl('');

  message: String = "";
  messageType: String = "success";

  types: string[] = ['Expense', 'Income', 'Savings'];
  chosenType: string = this.types[0]; // default selected
  people: string[] = ['Augusto', 'Camila', 'Both'];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  categorySelected: string = "";

  constructor(private transactionService : TransactionService) {
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
    this.transactionService.getCategories().subscribe(data => {
      data.forEach(element => {
        this.categories.push(element);
      });
    });

    console.log(this.subcategories)
  }

  onSubmit(transactionData, formDirective: FormGroupDirective) {
    if (!this.newTransactionForm.invalid) {
      const format = 'yyyy-MM-dd';
      transactionData.date = formatDate(transactionData.date, format, 'en-US');
      console.log(transactionData.date)
      this.addNewTransaction(transactionData, formDirective);
    }
  }

  getErrorMessage(field) {
    if (field === 'type') {
      return 'Please select a type.';
    } else if (field === 'who') {
      return 'Please select a person.';
    } else if (field === 'category') {
      return 'Please select a category';
    } else if (field === 'title') {
      return 'Please enter a title';
    } else if (field === 'date') {
      return 'Please enter a date';
    } else if (field === 'value') {
      return 'Please enter a valid value';
    }
    return 'Other error'
  }

  addNewTransaction(transaction, formDirective): void {
    // transaction.date = Date.parse
    this.transactionService.postNewTransaction(transaction).subscribe({
      next: res => {
        this.writeMessage(res.message, 'success');
        formDirective.resetForm();
        this.newTransactionForm.reset({type: 'Expense'});
      },
      error: error => {
        console.log(error)
        this.writeMessage(error.error.message, 'error')
      }
    });
    console.log('addNewTransaction')
  }

  writeMessage(msg, type) {
    this.message = msg;
    this.messageType = type;
  }


}
