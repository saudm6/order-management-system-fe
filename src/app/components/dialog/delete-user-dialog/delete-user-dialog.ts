import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { DeleteUserDialogData } from '../../../models/delete-user-dialog-data';
import { UserService } from '../../../service/user-service';
import { rxState } from '@rx-angular/state';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface DeleteUserDialogState {
  isDeleting: boolean;
  errorMessage: string;
}

@Component({
  selector: 'app-delete-user-dialog',
  imports: [MatDialogModule],
  templateUrl: './delete-user-dialog.html',
  styleUrl: './delete-user-dialog.css',
})
export class DeleteUserDialog {
  readonly data = inject<DeleteUserDialogData>(MAT_DIALOG_DATA);
  readonly destroyRef = inject(takeUntilDestroyed);

  private readonly dialogRef = inject(
    MatDialogRef<DeleteUserDialog>,
  );

  private readonly userService = inject(UserService);

  private readonly state = rxState<DeleteUserDialogState>(({ set }) => {
    set ({
      isDeleting: false,
      errorMessage: '',
    })
  })

  readonly isDeleting = this.state.signal('isDeleting');
  readonly errorMessage = this.state.signal('errorMessage');

  confirmDelete(): void {
    if (this.isDeleting()) {
      return;
    }

    this.state.set({ isDeleting: true, errorMessage: '' });

    this.userService.deleteUser(this.data.userId).pipe(this.destroyRef)
    .subscribe({
      next: () => {
        this.dialogRef.close(true);
      },
      error: (error) => {
        console.error('Unable to delete user:', error);

        this.state.set({ errorMessage: 'Unable to delete this user. Please try again.', isDeleting: false, });
      },
    });
  }

  cancel(): void {
    if (!this.isDeleting()) {
      this.dialogRef.close(false);
    }
  }
}