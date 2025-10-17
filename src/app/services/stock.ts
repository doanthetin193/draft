import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Stock } from '../model/stock';
import { HttpService } from './http-service';

@Injectable({ providedIn: 'root' })
export class StockService {
  private stocksSubject = new BehaviorSubject<Stock[]>([]);
  stocks$ = this.stocksSubject.asObservable();

  constructor(private httpService: HttpService) {
    this.loadStocks();
  }

  loadStocks() {
    this.httpService.getStocks().subscribe((stocks: Stock[]) => {
      this.stocksSubject.next(stocks);
    });
  }

  addStock(stock: Stock): Observable<Stock> {
    return this.httpService.addStock(stock).pipe(
      tap(() => this.loadStocks())
    );
  }

  deleteStock(id: string | number): Observable<void> {
    return this.httpService.deleteStock(id).pipe(
      tap(() => this.loadStocks())
    );
  }

  updateStock(id: string | number, stock: Stock): Observable<Stock> {
    return this.httpService.updateStock(id, stock).pipe(
      tap(() => this.loadStocks())
    );
  }

  getStockById(id: string | number): Observable<Stock> {
    return this.httpService.getStockById(id);
  }

  getStocksSnapshot(): Stock[] {
    return this.stocksSubject.value;
  }
}
