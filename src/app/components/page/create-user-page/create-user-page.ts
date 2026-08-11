import { Component, input, output } from '@angular/core';
import { Form, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-user-page',
  imports: [ReactiveFormsModule],
  templateUrl: './create-user-page.html',
  styleUrl: './create-user-page.css',
})
export class CreateUserPage {
  readonly userForm = input.required<FormGroup>();
  readonly isSubmitting = input(false);
  readonly errorMessage = input('');

  readonly submitted = output<void>();
  readonly cancelled = output<void>();
}
