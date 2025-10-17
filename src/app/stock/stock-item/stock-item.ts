import { Component, Input } from '@angular/core';
import { Stock } from '../../model/stock';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock-item',
  imports: [CommonModule],
  templateUrl: './stock-item.html',
  styleUrls: ['./stock-item.css']
})
export class StockItem {
  @Input() stock!: Stock; // nhận dữ liệu từ cha

  toggleFavorite() {
    this.stock.favorite = !this.stock.favorite;
  }
}