import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { StockList } from './stock-list/stock-list';
import { StockDetails } from './stock-details/stock-details';
import { CreateStockPage } from './create-stock-page/create-stock-page';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'stocks', component: StockList },
  { path: 'create', component: CreateStockPage },
  { path: 'stocks/:id', component: StockDetails }
];
