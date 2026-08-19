import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../service';
import { EditUserDialogData } from '../../../models/edit-user-dialog-data';
import { rxState } from '@rx-angular/state';
import { finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface EditUsersDialogState{
  isLoading: boolean;
  isSubmitting: boolean;
  errorMessage: string;
}
@Component({
  selector: 'app-edit-users-dialog',
  imports: [ReactiveFormsModule, MatDialogModule],
  templateUrl: './edit-users-dialog.html',
  styleUrl: './edit-users-dialog.css',
})
export class EditUsersDialog implements OnInit {
  private readonly data = inject<EditUserDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<EditUsersDialog>);
  private readonly userService = inject(UserService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);


  private readonly state = rxState<EditUsersDialogState>(({ set }) => {

    set({
      isLoading: false,
      isSubmitting: false,
      errorMessage: '',
    });
  });


  readonly isLoading = this.state.signal('isLoading');
  readonly isSubmitting = this.state.signal('isSubmitting');
  readonly errorMessage = this.state.signal('errorMessage');


  readonly userForm = this.formBuilder.nonNullable.group({
    fullName: [''],
    email: ['', Validators.email],
  });

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {

    this.state.set({ isLoading: true });
    
    this.userService.getUserById(this.data.userId)
    .pipe(
      takeUntilDestroyed (this.destroyRef), 
      finalize(() => {
        this.state.set({ isLoading: false });
      }))
    .subscribe({
      next: (user) => {
        this.userForm.patchValue({
          fullName: user.fullName ?? '',
          email: user.email ?? '',
        });
      },
      error: (error) => {
        console.error('Unable to load user: ', error);
        this.state.set({ errorMessage: 'Unable to load user.', });
      },
    });
  }

  saveUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting()) {
      return;
    }
    this.state.set({ isSubmitting: true });

    this.userService.updateUser(this.data.userId, this.userForm.getRawValue()).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },

      error: (error) => {
        console.error('Unable to update user: ', error);
        this.state.set({ isSubmitting: false, errorMessage: 'Unable to update the user.', });
      },
    });
  }

  cancel(): void {
    if (!this.isSubmitting()){
      this.dialogRef.close(false)
    }
  }
}
