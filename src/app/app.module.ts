import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatRadioModule } from '@angular/material/radio'
import { MatSliderModule } from '@angular/material/slider';

import { AngularMaterialModule } from './angular-material/angular-material.module';


@NgModule({
  declarations: [
    AppComponent,
    NewTransactionComponent,
    ReactiveFormsModule
  ],
  imports: [
    AngularMaterialModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
