import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../service/user-service';
import { EditUserDialogData } from '../../../models/edit-user-dialog-data';


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

  readonly isLoading = signal(false);
  readonly isSubmitting = signal(false);

  readonly userForm = this.formBuilder.nonNullable.group({
    fullName: [''],
    email: ['', Validators.email],
  });

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser() {
    this.isLoading.set(true);

    this.userService.getUserById(this.data.userId).subscribe({
      next: (user) => {
        this.userForm.patchValue({
          fullName: user.fullName ?? '',
          email: user.email ?? '',
        });
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Unable to load user: ', error);
        this.isLoading.set(false);
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

    this.isSubmitting.set(true);

    this.userService.updateUser(this.data.userId, this.userForm.getRawValue()).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },

      error: (error) => {
        console.error('Unable to update user: ', error);
        this.isSubmitting.set(false);
      },
    });
  }

  cancel(): void {
    if (!this.isSubmitting()){
      this.dialogRef.close(false)
    }
  }
}
