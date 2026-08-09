import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../../service/user-service';
import { UserData } from '../../../models/user-data';
import { UserFormValue } from '../../../models/user-form-value';
import { UserDetailsPage } from '../user-details-page/user-details-page';

@Component({
  selector: 'app-user-form-details-page',
  imports: [UserDetailsPage, RouterLink],
  templateUrl: './user-form-details-page.html',
  styleUrl: './user-form-details-page.css',
})
export class UserFormDetailsPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userService = inject(UserService);

  readonly user = signal<UserData | null>(null);
  readonly isLoading = signal(true);
  readonly isSaving = signal(false);
  readonly errorMessage = signal('');

  private userId = '';

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

  loadUser(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.user.set(user);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Unable to load user:', error);
        this.errorMessage.set('Unable to load this user.');
        this.isLoading.set(false);
      },
    });
  }

  saveUser(value: UserFormValue): void {
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