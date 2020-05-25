import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {
  options: FormGroup;
  whoControl = new FormControl('augusto');

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      who: this.whoControl,
    });
  }

  ngOnInit(): void {
  }

}
