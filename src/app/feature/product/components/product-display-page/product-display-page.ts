import { Component, inject, OnInit, signal, input, output } from '@angular/core';
import { ProductDisplay } from '../../models/';

@Component({
  selector: 'app-product-display-page',
  imports: [],
  templateUrl: './product-display-page.html',
  styleUrl: './product-display-page.css',
})
export class ProductDisplayPage {

    readonly productDisplay = input.required<readonly ProductDisplay[]>();
    readonly isLoading = input(false);
    readonly errorMessage = input('');

    readonly displayedProduct = output<void>();
    readonly addProduct = output<void>();
}
