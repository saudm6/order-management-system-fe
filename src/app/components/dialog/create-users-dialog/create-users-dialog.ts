import { Component, inject, input, output, signal } from '@angular/core';
import { UserFormValue } from '../../../models/user-form-value';
import { FormBuilder, Validators, ReactiveFormsModule, Validator } from '@angular/forms';
import { UserService } from '../../../service/user-service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-create-users-dialog',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './create-users-dialog.html',
  styleUrl: './create-users-dialog.css',
})
export class CreateUsersDialog {

  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  created = output<UserFormValue>();
  cancelled = output<void>();

  readonly userForm = this.formBuilder.nonNullable.group({
    first_name: [''],
    middle_name: [''],
    last_name: [''],
    gender: [''],
    dob: [''],
    email: ['', Validators.email],
    password: [''],
  })

  submitForm(): void {
    if(this.userForm.invalid){
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting()){
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.userService.createUser(this.userForm.getRawValue()).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/users']);
      },
    })
  }

  cancel(): void{
    if (!this.isSubmitting()){
      this.router.navigate(['users']);
    }
  }
}
