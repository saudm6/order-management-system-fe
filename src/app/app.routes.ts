import { Routes } from '@angular/router';
import { AllUsersPage } from './components/page/all-users-page/all-users-page';
import { UserFormDetailsPage} from './components/page/user-form-details-page/user-form-details-page'
import { CreateUsersDialog } from './components/dialog/create-users-dialog/create-users-dialog';
export const routes: Routes = [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users/:id/edit', component: UserFormDetailsPage },
    { path: 'users', component: AllUsersPage },
    { path: 'users/create', component: CreateUsersDialog },
    { path: '**', redirectTo: 'users' },
];
