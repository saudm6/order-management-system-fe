import { Component, inject, signal, input, output, effect, OnInit } from '@angular/core';
import { UserData } from '../../models';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { UpdateUserRequest } from '../../models/update-user-request';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../service/index';
import { UserFormDetailsPage } from '../../components/page/user-form-details-page/user-form-details-page';

@Component({
  selector: 'app-user-form-details-list',
  imports: [UserFormDetailsPage],
  templateUrl: './user-form-details-list.html',
  styleUrl: './user-form-details-list.css',
})
export class UserFormDetailsList implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);
  private readonly formBuilder = inject(FormBuilder);

  readonly user = signal<UserData | null>(null);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);

  // readonly errorMessage = signal('');
  readonly errorMessage = signal('');
  readonly closeDialog = signal(false);

  private userId = '';

  isSubmitting = input(false);

  submitted = output<UpdateUserRequest>();
  cancelled = output<void>();

  userForm = this.formBuilder.nonNullable.group({
    fullName: [''],
    email: ['', Validators.email],
  });

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage.set('No user ID was provided.');
      this.isLoading.set(false);
      return;
    }

    this.userId = id;
    this.loadUser();
  }

  submitForm(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.submitted.emit(this.userForm.getRawValue());
  }

  loadUser(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user.set(user);

        this.userForm.patchValue({
          fullName: user.fullName ?? '',
          email: user.email ?? '',
        });

        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Unable to load user:', error);
        this.errorMessage.set('Unable to load this user.');
        this.isLoading.set(false);
      },
    });
  }

  saveUser(value: UpdateUserRequest): void {
    if (this.isSaving()) {
      return;
    }

    this.isSaving.set(true);
    this.errorMessage.set('');

    this.userService.updateUser(this.userId, value).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.router.navigate(['/users']);
      },
      error: (error) => {
        console.error('Unable to update user:', error);
        this.errorMessage.set('Unable to save the user changes.');
        this.isSaving.set(false);
      },
    });
  }

  cancel(): void {
    if (!this.isSaving()) {
      this.router.navigate(['/users']);
    }
  }
}
