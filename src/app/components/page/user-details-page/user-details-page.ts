import { Component, inject, signal, input, output, effect } from '@angular/core';
import { UserData } from '../../../models/user-data';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserFormValue } from '../../../models/user-form-value';

@Component({
  selector: 'app-user-details-page',
  imports: [ReactiveFormsModule],
  templateUrl: './user-details-page.html',
  styleUrl: './user-details-page.css',
})
export class UserDetailsPage {
  private readonly formBuilder = inject(FormBuilder);

  user = input<UserData | null>(null);
  isSubmitting = input(false);

  submitted = output<UserFormValue>();
  cancelled = output<void>();

  userForm = this.formBuilder.nonNullable.group({
    first_name: [''],
    middle_name: [''],
    last_name: [''],
    gender: [''],
    dob: [''],
    email: ['', Validators.email],
    password: [''],
  });

  constructor() {
    effect(() => {
      const selectedUser = this.user();

      if (selectedUser) {
        this.userForm.patchValue({
          first_name: selectedUser.first_name ?? '',
          middle_name: selectedUser.middle_name ?? '',
          last_name: selectedUser.last_name ?? '',
          gender: selectedUser.gender ?? '',
          dob: selectedUser.dob?.substring(0, 10) ?? '',
          email: selectedUser.email ?? '',
          password: selectedUser.password ?? '',
        });
      } else {
        this.userForm.reset();
      }
    });
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.userForm.getRawValue());
  }
}
