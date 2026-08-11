import { Component, inject, signal } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { DeleteUserDialogData } from '../../../models/delete-user-dialog-data';
import { UserService } from '../../../service/user-service';

@Component({
  selector: 'app-delete-user-dialog',
  imports: [MatDialogModule],
  templateUrl: './delete-user-dialog.html',
  styleUrl: './delete-user-dialog.css',
})
export class DeleteUserDialog {
  readonly data = inject<DeleteUserDialogData>(MAT_DIALOG_DATA);

  private readonly dialogRef = inject(
    MatDialogRef<DeleteUserDialog>,
  );

  private readonly userService = inject(UserService);

  readonly isDeleting = signal(false);
  readonly errorMessage = signal('');

  confirmDelete(): void {
    if (this.isDeleting()) {
      return;
    }

    this.isDeleting.set(true);
    this.errorMessage.set('');

    this.userService.deleteUser(this.data.userId).subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Unable to delete user:', error);
        this.errorMessage.set(
          'Unable to delete this user. Please try again.',
        );
        this.isDeleting.set(false);
      },
    });
  }

  cancel(): void {
    if (!this.isDeleting()) {
      this.dialogRef.close(false);
    }
  }
}