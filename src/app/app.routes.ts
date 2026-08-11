import { Routes } from '@angular/router';
import { AllUsersList } from './containers/all-users-list/all-users-list';
import { CreateUserList } from './containers/create-user-list/create-user-list';
export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    // { path: 'users/:id/edit', component: UserFormDetailsList },
    { path: 'users', component: AllUsersList },
    { path: 'users/create', component: CreateUserList },
    { path: '**', redirectTo: 'users' },
];
