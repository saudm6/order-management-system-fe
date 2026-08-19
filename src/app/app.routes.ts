import { Routes } from '@angular/router';
import { AllUsersList } from './feature/user/containers/all-users-list/all-users-list';
import { RegisterUserList } from './feature/user/containers/register-user-list/register-user-list';
import { LoginUserList } from './feature/user/containers/login-user-list/login-user-list';
import { authGuard } from './shared/guard/auth.guard';
import { AddProductList } from './feature/product/containers/add-product-list/add-product-list';
import { ProductDisplayList } from './feature/product/containers/product-display-list/product-display-list';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'users', component: AllUsersList, canActivate: [authGuard] },
    { path: 'users/register', component: RegisterUserList },
    { path: 'login', component: LoginUserList },
    { path: 'product', component: ProductDisplayList, canActivate: [authGuard]},
    { path: 'product/add', component: AddProductList, canActivate: [authGuard]},
    { path: '**', redirectTo: 'login' },
];
