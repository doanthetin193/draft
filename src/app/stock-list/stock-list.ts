import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StockService } from '../services/stock';
import { Stock } from '../model/stock';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stock-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stock-list.html',
  styleUrls: ['./stock-list.css']
})
export class StockList implements OnInit {
  stocks$!: Observable<Stock[]>;

  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.stocks$ = this.stockService.stocks$;
  }

  deleteStock(id: number) {
    if (confirm('Delete this stock?')) {
      this.stockService.deleteStock(id).subscribe();
    }
  }
}
