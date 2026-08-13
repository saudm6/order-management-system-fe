import { Component, input, output } from '@angular/core';
import { Form, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getMatInputUnsupportedTypeError } from '@angular/material/input';

@Component({
  selector: 'app-login-user-page',
  imports: [ReactiveFormsModule],
  templateUrl: './login-user-page.html',
  styleUrl: './login-user-page.css',
})
export class LoginUserPage {
  readonly userForm = input.required<FormGroup>();
  readonly isSubmitting = input(false);
  readonly errorMessage = input('');

  readonly submitted = output<void>();
  readonly cancelled = output<void>();
}
