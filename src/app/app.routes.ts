import { Routes } from '@angular/router';
import { AllUsersList } from './feature/user/containers/all-users-list/all-users-list';
import { RegisterUserList } from './feature/user/containers/register-user-list/register-user-list';
import { LoginUserList } from './feature/user/containers/login-user-list/login-user-list';
import { authGuard } from './shared/guard/auth.guard';
import { ProductList } from './feature/product/containers/product-list/product-list';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'users', component: AllUsersList, canActivate: [authGuard] },
    { path: 'users/register', component: RegisterUserList },
    { path: 'login', component: LoginUserList },
    { path: '**', redirectTo: 'login' },
    { path: 'product', component: ProductList, canActivate: [authGuard]},
];
