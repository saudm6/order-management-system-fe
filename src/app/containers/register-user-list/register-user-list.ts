import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserPage } from '../../components/page/register-user-page/register-user-page';
import { UserService } from '../../service';
import { rxState } from '@rx-angular/state';
import { finalize } from 'rxjs';

interface RegisterUserState {
  isSubmitting: boolean;
  errorMessage: string;
}

@Component({
  selector: 'app-register-user-list',
  imports: [RegisterUserPage],
  templateUrl: './register-user-list.html',
  styleUrl: './register-user-list.css',
})
export class RegisterUserList {
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  private readonly state = rxState<RegisterUserState>(({ set }) => {
    set({
      isSubmitting: false,
      errorMessage: '',
    });
  });

  readonly isSubmitting = this.state.signal('isSubmitting');
  readonly errorMessage = this.state.signal('errorMessage');

  readonly userForm = this.formBuilder.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.minLength(8), Validators.required]],
  });

  registerUser(): void {
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
      .registerUser(this.userForm.getRawValue())
      .pipe(
        finalize(() => {
          this.state.set({ isSubmitting: false });
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/users']);
        },
        error: (error) => {
          console.error('Unable to load user: ', error);
          this.state.set({
            errorMessage: 'Unable to register user',
          });
        },
      });
  }
  cancel(): void {
    if (!this.isSubmitting()) {
      this.router.navigate(['/users']);
    }
  }
}
