import { Component, inject, input, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUserPage } from '../../components/page/login-user-page/login-user-page';
import { UserService } from '../../service';

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

  readonly isSubmitting = signal(false);
  readonly errorMessage = signal('');

  readonly userForm = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    // token: [''],
    // password: ['', [Validators.required, Validators.minLength(8)]],
  });

  loginUser(): void {
    if (this.userForm.invalid){
      this.userForm.markAllAsTouched();
      return;
    }
    if (this.isSubmitting()){
      return;
    }

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.userService.loginUser(this.userForm.getRawValue()).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);

        if (!response.hasAuthority || !response.token){
          this.errorMessage.set('Invalid Email or Password');
          return;
        }

        localStorage.setItem('authToken', response.token);
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Unable to login user: ', error);
        this.errorMessage.set('Unable to login user');
        this.isSubmitting.set(false);
      }
    });
  }

  cancel(): void {
    if (!this.isSubmitting()){
      this.router.navigate(['/login'])
    }
  }
}
