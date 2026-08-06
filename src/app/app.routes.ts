import { Routes } from '@angular/router';
import { AllUsersPage } from './components/page/all-users-page/all-users-page';

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: AllUsersPage },
    { path: '**', redirectTo: 'users' },
];
