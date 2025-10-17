import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Stock } from '../model/stock';

@Component({
  selector: 'app-create-stock-reactive',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock-reactive.html',
  styleUrls: ['./create-stock-reactive.css']
})
export class CreateStockReactive {
  exchanges = ['NYSE', 'NASDAQ', 'HSX', 'HNX'];
  stockForm: FormGroup;
  
  @Output() stockCreated = new EventEmitter<Stock>();

  constructor(private fb: FormBuilder) {
    this.stockForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      price: [0, Validators.required],
      previousPrice: [0, Validators.required],
      exchange: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.stockForm.valid) {
      const { name, code, price, previousPrice, exchange } = this.stockForm.value;
      const stock = new Stock(name, code, price, previousPrice, exchange);
      this.stockCreated.emit(stock);
      this.stockForm.reset();
    }
  }
}
