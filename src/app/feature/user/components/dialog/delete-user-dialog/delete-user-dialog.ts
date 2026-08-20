import { Component, inject, DestroyRef } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

import { DeleteUserDialogData } from '../../../models/delete-user-dialog-data';
import { UserService } from '../../../service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RxState, rxState } from '@rx-angular/state';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

interface DeleteUserDialogState {
  isDeleting: boolean;
  errorMessage: string;
}

type ViewModel = DeleteUserDialogState;

@Component({
  selector: 'app-delete-user-dialog',
  imports: [MatDialogModule, AsyncPipe],
  providers: [RxState],
  templateUrl: './delete-user-dialog.html',
  styleUrl: './delete-user-dialog.css',
})
export class DeleteUserDialog {

  private readonly state = rxState<DeleteUserDialogState>();

  vm$: Observable<ViewModel>;

  readonly data = inject<DeleteUserDialogData>(MAT_DIALOG_DATA);
  readonly destroyRef = inject(DestroyRef);

  private readonly dialogRef = inject(
    MatDialogRef<DeleteUserDialog>,
  );

  private readonly userService = inject(UserService);

  constructor () {
    this.state.set({ 
      isDeleting: false,
      errorMessage: '',
    });

    this.vm$ = this.state.select();
  }


  confirmDelete(): void {
    if (this.state.get('isDeleting')) {
      return;
    }

    this.state.set({ isDeleting: true, errorMessage: '' });

    this.userService.deleteUser(this.data.userId).pipe(takeUntilDestroyed(this.destroyRef))
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
    if (!this.state.get('isDeleting')) {
      this.dialogRef.close(false);
    }
  }
}