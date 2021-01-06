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

  category: FormControl =  new FormControl('', Validators.required);
  subcategory: FormControl =  new FormControl('', Validators.required);
  title: FormControl =  new FormControl('', Validators.required);
  date: FormControl =  new FormControl((new Date()).toISOString(), Validators.required);
  value: FormControl =  new FormControl('', Validators.min(0.01));
  notes: FormControl =  new FormControl('');

  message: String = '';
  messageType: String = 'success';
  subcategoryLabelMessage: String = 'Subcategory (Please select a Category)'

  types: string[] = ['Expense', 'Income', 'Savings'];
  chosenType: string = this.types[0]; // default selected
  people: string[] = ['Augusto', 'Camila', 'Both'];
  categories: Category[] = [];
  subcategories: Subcategory[] = [];
  categorySelected: string = '';
  subcategorySelected: string = '';

  constructor(private transactionService : TransactionService) {
    this.newTransactionForm = new FormGroup({
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
    if (field === 'category') {
      return 'Please select a category';
    } else if (field === 'subcategory') {
      return 'Please select a subcategory';
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
    console.log('here');
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

  categoryClick(event : any, cat : Category) {
    this.categorySelected = cat.name;
    this.subcategorySelected = '';
    this.updateSubcategories().then(() => {
      console.log(this.subcategories);
      if (this.subcategories.length === 0) {
        this.subcategoryLabelMessage = 'This category has no subcategories. Please add one.';
      } else {
        this.subcategoryLabelMessage = 'Subcategory';
      }
    });
  }

  updateSubcategories() : Promise<void> {
    this.subcategories = [];
    const updateSubcatPromise = new Promise<void>((resolve, reject) => {
      this.transactionService.getSubcategories(this.categorySelected).subscribe(data => {
        data.forEach(element => {
          this.subcategories.push(element);
        });
        resolve();
      });
    });
    return updateSubcatPromise;
  }

  subcategoryClick(event : any, subcat : Subcategory) {
    this.subcategorySelected = subcat.name;
  }
}
