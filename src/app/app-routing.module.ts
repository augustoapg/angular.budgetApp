import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewTransactionComponent } from './new-transaction/new-transaction.component';
import { NewBudgetComponent } from './new-budget/new-budget.component';
import { SummaryComponent } from './summary/summary.component';


const routes: Routes = [
  { path: 'new-transaction', component: NewTransactionComponent },
  { path: 'new-budget', component: NewBudgetComponent },
  { path: 'summary', component: SummaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
