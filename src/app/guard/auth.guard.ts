import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../service'; 
import { routes } from '../app.routes';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(UserService);
    const router = inject(Router);

    if (!authService.IsLoggedIn()){
        return router.parseUrl('/login')
    }
    return true;
}
