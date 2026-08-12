import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { RegisterUserPage } from '../../components/page/register-user-page/register-user-page';
import { UserService } from '../../service';

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

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  readonly userForm = this.formBuilder.nonNullable.group({
    fullName: [''],
    email: ['', Validators.email],
    password: [''],
  });

  registerUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.userService.registerUser(this.userForm.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Unable to load user: ', error);
        this.errorMessage.set('Unable to register user');
        this.isSubmitting.set(false);
      },
    });
  }
  cancel(): void {
    if (!this.isSubmitting()) {
      this.router.navigate(['/users']);
    }
  }
}
