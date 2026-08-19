import { Component, inject, OnInit } from '@angular/core';
// import { UserService } from '../../service';
// import { Router } from '@angular/router';
// import { UserData } from '../../models/user-data';
// import { AllUsersPage } from '../../components/page/all-users-page/all-users-page';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { EditUsersDialog } from '../../components/dialog/edit-users-dialog/edit-users-dialog';
// import { DeleteUserDialog } from '../../components/dialog/delete-user-dialog/delete-user-dialog';
import { Router } from '@angular/router';
import { rxState } from '@rx-angular/state';
import { finalize, Observable } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { ProductDisplay } from '../../models';
import { ProductDisplayPage } from '../../components/product-display-page/product-display-page';
import { AddProductList } from '../add-product-list/add-product-list';

interface ProductDisplayState {
  products: ProductDisplay[];
  isSubmitting: boolean;
  isLoading: boolean;
  errorMessage: string;
}

@Component({
  selector: 'app-product-display-list',
  imports: [ProductDisplayPage],
  templateUrl: './product-display-list.html',
  styleUrl: './product-display-list.css',
})
export class ProductDisplayList {
  private readonly productService = inject(ProductService);
  private readonly router = inject(Router);
  private readonly state = rxState<ProductDisplayState>(({ set }) => {
    set({
      products: [],
      isSubmitting: false,
      isLoading: false,
      errorMessage: '',
    });
  });
  
  readonly products = this.state.signal('products');
  readonly isSubmitting = this.state.signal('isSubmitting');
  readonly isLoading = this.state.signal('isLoading');
  readonly errorMessage = this.state.signal('errorMessage');


  // productsDisplayState$ = Observable<ProductDisplayState>;


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    if (this.state.get('isLoading')) {
      return;
    }
    if (this.state.get('isSubmitting')) {
      return;
    }

    this.state.set({ isSubmitting: false, isLoading: true });

    this.productService
      .getAllProducts()
      .pipe(
        finalize(() => {
          this.state.set({ isLoading: false, isSubmitting: false });
        }),
      )
      .subscribe({
        next: (products) => {
          this.state.set({ products: products });
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.state.set({ errorMessage: 'Error Loading Products' });
        },
      });
  }

  goToAddProduct(): void {
    this.router.navigate(['/product/add']);
  }
}
