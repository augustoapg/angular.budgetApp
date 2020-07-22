import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { TransactionService } from './transaction.service';
import { Transaction } from './Transaction';

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
  title: FormControl =  new FormControl('', Validators.required);
  date: FormControl =  new FormControl('', Validators.required);
  value: FormControl =  new FormControl('', Validators.min(0.01));
  notes: FormControl =  new FormControl('');

  types: string[] = ['Expense', 'Income', 'Savings'];
  chosenType: string = this.types[0]; // default selected
  people: string[] = ['Augusto', 'Camila', 'Both'];
  categories: string[] = ['Home', 'Car', 'Entertainment', 'Utility'];

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
  }

  onSubmit(transactionData, formDirective: FormGroupDirective) {
    console.log(this.newTransactionForm.hasError())
    if (!this.newTransactionForm.invalid) {
      formDirective.resetForm();
      this.newTransactionForm.reset({type: 'Expense'});
      this.addNewTransaction(transactionData);
      console.log('Transaction submitted!', transactionData);
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

  addNewTransaction(transaction): void {
    this.transactionService.postNewTransaction(transaction).subscribe({
      next: message => console.log(message),
      error: error => console.log('There was an error!', error)
    });
    console.log('addNewTransaction')
  }
}
