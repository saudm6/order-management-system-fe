import { Routes } from '@angular/router';
import { AllUsersPage } from './components/page/all-users-page/all-users-page';
import  { UserFormDetailsPage} from './components/page/user-form-details-page/user-form-details-page'

export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users/:id/edit', component: UserFormDetailsPage },
    { path: 'users', component: AllUsersPage },
    { path: '**', redirectTo: 'users' },
];
