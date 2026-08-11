import { Component, inject, OnInit, signal, input, output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user-service';
import { UserData } from '../../../models/user-data';
import { UserFormValue } from '../../../models/user-form-value';
import { readonly } from '@angular/forms/signals';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form-details-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './user-form-details-page.html',
  styleUrl: './user-form-details-page.css',
})
export class UserFormDetailsPage {

  readonly user = input<UserData | null>(null);
  readonly userForm = input.required<any>();
  readonly isLoading = input(false);
  readonly isSubmitting = input(false);
  readonly errorMessage = input('');


  readonly saveUser = output<UserFormValue>();
  readonly retry = output<void>();
  readonly closeDialog = output<void>();
}