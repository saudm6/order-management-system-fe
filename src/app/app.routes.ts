import { Routes } from '@angular/router';
import { AllUsersList } from './containers/all-users-list/all-users-list';
import { RegisterUserList } from './containers/register-user-list/register-user-list';
export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    // { path: 'users/:id/edit', component: UserFormDetailsList },
    { path: 'users', component: AllUsersList },
    { path: 'users/register', component: RegisterUserList },
    { path: '**', redirectTo: 'users' },
];
