import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CreateStockReactive } from '../create-stock-reactive/create-stock-reactive';
import { StockService } from '../services/stock';
import { Stock } from '../model/stock';

@Component({
  selector: 'app-create-stock-page',
  standalone: true,
  imports: [CommonModule, CreateStockReactive],
  template: `
    <div class="create-page">
      <h2>Create New Stock</h2>
      <app-create-stock-reactive (stockCreated)="addStock($event)"></app-create-stock-reactive>
    </div>
  `,
  styles: [`
    .create-page {
      max-width: 800px;
      margin: 50px auto;
      padding: 20px;
    }
    h2 {
      text-align: center;
      margin-bottom: 30px;
    }
  `]
})
export class CreateStockPage {
  constructor(private stockService: StockService, private router: Router) {}

  addStock(stock: Stock) {
    this.stockService.addStock(stock).subscribe({
      next: () => {
        alert('Stock created successfully!');
        this.router.navigate(['/stocks']);
      },
      error: (err) => console.error('Error creating stock:', err)
    });
  }
}
