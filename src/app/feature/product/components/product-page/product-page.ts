import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-product-page',
  imports: [ReactiveFormsModule],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage {
  readonly productForm = input.required<FormGroup>;
  readonly isSubmitting = input(false);
  readonly errorMessage = input('');

  readonly submitted = output<void>();
  readonly cancelled = output<void>();
}
