import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators, ValueChangeEvent } from '@angular/forms';
import { Router } from '@angular/router';
import { rxState } from '@rx-angular/state';
import { finalize } from 'rxjs';
import { contains } from '../../../../shared/functions/index';
import { AddOrderLineItemPage } from '../../components/add-order-line-item-page/add-order-line-item-page';
import { OrderLineItemService } from '../../service/order-line-item.service';

interface AddOrderLineItemState {
  isSubmitting: boolean;
  errorMessage: string;
}

@Component({
  selector: 'app-add-order-line-item-list',
  imports: [],
  templateUrl: './add-order-line-item-list.html',
  styleUrl: './add-order-line-item-list.css',
})

export class AddOrderLineItemList {
private readonly formBuilder = inject(FormBuilder);
  private readonly orderLineItemService = inject(OrderLineItemService);
  private readonly router = inject(Router);

  private readonly state = rxState<AddOrderLineItemState>(({ set }) => {
    set({
      isSubmitting: false,
      errorMessage: '',
    });
  });

  readonly isSubmitting = this.state.signal('isSubmitting');
  readonly errorMessage = this.state.signal('errorMessage');


  readonly orderLineItemListForm = this.formBuilder.nonNullable.group({
    productId: ['', Validators.required],
    quantity: [1, [Validators.required, Validators.min(1)]],
  });

  addOrderLineItem(): void {
    if(this.orderLineItemListForm.invalid){
      this.orderLineItemListForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting()){
      return;
    }

    this.state.set({
      isSubmitting: true,
      errorMessage: '',
    });

    const formValues = this.orderLineItemListForm.getRawValue();

    const request = {
      productId : formValues.productId,
      quantity: formValues.quantity,
    }

    this.orderLineItemService.addOrderLineItem(request).pipe(
      finalize(() => {
        this.state.set({ isSubmitting: false});
      }),
    )
    .subscribe({
      next: () => {
        
      },
      error: (error) => {
        console.error('Unable to add order line item:', error);

      this.state.set({
        errorMessage: 'Unable to add order line item.'
      });
      }
    })
  }
}
