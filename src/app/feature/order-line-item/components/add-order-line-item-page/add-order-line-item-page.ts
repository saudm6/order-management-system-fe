import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-order-line-item-page',
  imports: [ReactiveFormsModule],
  templateUrl: './add-order-line-item-page.html',
  styleUrl: './add-order-line-item-page.css',
})

export class AddOrderLineItemPage {
  readonly orderLineItemForm = input.required<FormGroup>();
  readonly isSubmitting = input(false);
  readonly errorMessage = input('');

  readonly submitted = output<void>();
  readonly cancelled = output<void>();
}
