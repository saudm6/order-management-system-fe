import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { CreateUserPage } from '../../components/page/create-user-page/create-user-page';
import { UserService } from '../../service';

@Component({
  selector: 'app-create-user-list',
  imports: [CreateUserPage],
  templateUrl: './create-user-list.html',
  styleUrl: './create-user-list.css',
})
export class CreateUserList {
  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  readonly userForm = this.formBuilder.nonNullable.group({
    first_name: [''],
    middle_name: [''],
    last_name: [''],
    gender: [''],
    dob: [''],
    email: ['', Validators.email],
    password: [''],
  });

  createUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.isSubmitting()) {
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.userService.createUser(this.userForm.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Unable to load user: ', error);
        this.errorMessage.set('Unable to create user');
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
