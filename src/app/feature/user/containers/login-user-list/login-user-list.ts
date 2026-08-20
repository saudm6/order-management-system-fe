import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserPage } from '../../components/page/login-user-page/login-user-page';
import { AuthService } from '../../../../shared/service/auth.service';
import { rxState, RxState } from '@rx-angular/state';
import { finalize, Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

interface LoginUserState {
  isSubmitting: boolean;
  errorMessage: string;
}

type ViewModel = LoginUserState;

@Component({
  selector: 'app-login-user-list',
  imports: [LoginUserPage, AsyncPipe],
  providers: [RxState],
  templateUrl: './login-user-list.html',
  styleUrl: './login-user-list.css',
})
export class LoginUserList {

  private readonly state = rxState<LoginUserState>();

  vm$: Observable<ViewModel>;


  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly userForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  constructor() {
    this.state.set({
      isSubmitting: false,
      errorMessage: '',
    });

    this.vm$ = this.state.select();
  }

  loginUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.state.get('isSubmitting')) {
      return;
    }

    this.state.set({
      isSubmitting: true,
      errorMessage: '',
    });

    this.authService
      .loginUser(this.userForm.getRawValue())
      .pipe(
        finalize(() => {
          this.state.set({ isSubmitting: false });
        }),
      )
      .subscribe({
        next: (response) => {
          if (!response.hasAuthority || !response.token) {
            this.state.set({ errorMessage: 'Invalid Email or Password' });
            return;
          }

          localStorage.setItem('authToken', response.token);
          this.router.navigate(['/product']);
        },
        error: (error) => {
          console.error('Unable to login user: ', error);
          this.state.set({ errorMessage: 'Unable to login user' });
        },
      });
  }

  cancel(): void {
    if (!this.state.get('isSubmitting')) {
      this.router.navigate(['/login']);
    }
  }

  goToRegister(): void {
    if (!this.state.get('isSubmitting')) {
      this.router.navigate(['/users/register']);
    }
  }
}
