import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserPage } from '../../components/page/login-user-page/login-user-page';
import { UserService } from '../../service';
import { rxState } from '@rx-angular/state';
import { finalize } from 'rxjs';

interface LoginUserState {
  isSubmitting: boolean;
  errorMessage: string;
}

@Component({
  selector: 'app-login-user-list',
  imports: [LoginUserPage],
  templateUrl: './login-user-list.html',
  styleUrl: './login-user-list.css',
})
export class LoginUserList {
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  private readonly state = rxState<LoginUserState>(({ set }) => {
    set({
      isSubmitting: false,
      errorMessage: '',
    });
  });

  readonly isSubmitting = this.state.signal('isSubmitting');
  readonly errorMessage = this.state.signal('errorMessage');

  readonly userForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  loginUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.isSubmitting()) {
      return;
    }

    this.state.set({
      isSubmitting: true,
      errorMessage: '',
    });

    this.userService
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
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Unable to login user: ', error);
          this.state.set({ errorMessage: 'Unable to login user' });
        },
      });
  }

  cancel(): void {
    if (!this.isSubmitting()) {
      this.router.navigate(['/login']);
    }
  }
}
