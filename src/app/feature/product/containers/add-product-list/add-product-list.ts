import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../shared/service';
import { rxState } from '@rx-angular/state';
import { finalize } from 'rxjs';
import { contains } from '../../../../shared/functions/index';
import { ProductService } from '../../service/product.service';
import { AddProductPage } from '../../components/add-product-page/add-product-page';

interface ProductState {
  isSubmitting: boolean;
  errorMessage: string;
}

@Component({
  selector: 'app-add-product-list',
  imports: [AddProductPage],
  templateUrl: './add-product-list.html',
  styleUrl: './add-product-list.css',
})
export class AddProductList {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);

  private readonly state = rxState<ProductState>(({ set }) => {
    set({
      isSubmitting: false,
      errorMessage: '',
    });
  });

  readonly isSubmitting = this.state.signal('isSubmitting');
  readonly errorMessage = this.state.signal('errorMessage');

  readonly productForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required]],
    unitPrice: ['', [Validators.required]],
    availableStock: ['', [Validators.required]],
    reservedStock: ['', [Validators.required]],
  });

  addProduct(): void {
    if (this.productForm.invalid){
      this.productForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting()){
      return;
    }

    this.state.set({
      isSubmitting: true,
      errorMessage: '',
    });
    
    const formValues = this.productForm.getRawValue();

    const request = {
      name: formValues.name,
      unitPrice: Number(formValues.unitPrice),
      availableStock: Number(formValues.availableStock),
      reservedStock: Number(formValues.reservedStock),
    }

    this.productService.createProduct(request)
    .pipe(
      finalize(() => {
        this.state.set({ isSubmitting: false });
    }),
  )
  .subscribe({
    next: () => {
      this.state.set({ isSubmitting: false });
    },
    error: (error) => {
      console.error('Unable to add product:', error);

      this.state.set({
        errorMessage: 'Unable to add product.'
      });
    },
  });
}


  cancel(): void {
    if (!this.isSubmitting()) {
      this.router.navigate(['/product']);
    }
  }

  // goToProductDisplayPage(): void {
  //   if (!this.isSubmitting()) {
  //     this.router.navigate(['/users/product']);
  //   }
  // }
}
