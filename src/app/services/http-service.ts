import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getStocks(): Observable<any> {
    return this.httpClient.get(`${this.REST_API_SERVER}/stocks`);
  }

  addStock(stock: any): Observable<any> {
    return this.httpClient.post(`${this.REST_API_SERVER}/stocks`, stock);
  }

  updateStock(id: string | number, stock: any): Observable<any> {
    return this.httpClient.put(`${this.REST_API_SERVER}/stocks/${id}`, stock);
  }

  deleteStock(id: string | number): Observable<any> {
    return this.httpClient.delete(`${this.REST_API_SERVER}/stocks/${id}`);
  }

  getStockById(id: string | number): Observable<any> {
    return this.httpClient.get(`${this.REST_API_SERVER}/stocks/${id}`);
  }
}
