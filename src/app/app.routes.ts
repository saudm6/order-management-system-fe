import { Routes } from '@angular/router';
import { AllUsersList } from './containers/all-users-list/all-users-list';
import { RegisterUserList } from './containers/register-user-list/register-user-list';
import { LoginUserList } from './containers/login-user-list/login-user-list';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'users', component: AllUsersList, canActivate: [authGuard] },
    { path: 'users/register', component: RegisterUserList },
    { path: 'login', component: LoginUserList },
    { path: '**', redirectTo: 'login' },
];
