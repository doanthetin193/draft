import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { StockService } from '../services/stock';
import { Stock } from '../model/stock';
import { StockItem } from '../stock/stock-item/stock-item';

@Component({
  selector: 'app-stock-details',
  standalone: true,
  imports: [CommonModule, RouterModule, StockItem],
  templateUrl: './stock-details.html',
  styleUrls: ['./stock-details.css']
})
export class StockDetails implements OnInit {
  stock: Stock | null = null;

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.stockService.getStockById(id).subscribe({
        next: (data) => {
          this.stock = new Stock(data.name, data.code, +data.price, +data.previousPrice, data.exchange);
          this.stock.id = data.id;
          this.stock.favorite = data.favorite;
        }
      });
    }
  }
}
