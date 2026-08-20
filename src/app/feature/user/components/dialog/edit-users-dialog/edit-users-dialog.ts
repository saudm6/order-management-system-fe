import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../../service';
import { EditUserDialogData } from '../../../models/edit-user-dialog-data';
import { rxState, RxState } from '@rx-angular/state';
import { finalize, Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

interface EditUsersDialogState {
  isLoading: boolean;
  isSubmitting: boolean;
  errorMessage: string;
}

type ViewModel = EditUsersDialogState;

@Component({
  selector: 'app-edit-users-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, AsyncPipe],
  providers: [RxState],
  templateUrl: './edit-users-dialog.html',
  styleUrl: './edit-users-dialog.css',
})
export class EditUsersDialog implements OnInit {

  private readonly state = rxState<EditUsersDialogState>();

  vm$: Observable<ViewModel>;

  private readonly data = inject<EditUserDialogData>(MAT_DIALOG_DATA);
  private readonly dialogRef = inject(MatDialogRef<EditUsersDialog>);
  private readonly userService = inject(UserService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly userForm = this.formBuilder.nonNullable.group({
    fullName: [''],
    email: ['', Validators.email],
  });

  constructor() {

    this.state.set({
      isSubmitting: false,
      isLoading: false,
      errorMessage: '',
    });

    this.vm$ = this.state.select();
  }

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

    if (this.state.get('isSubmitting')) {
      return;
    }
    this.state.set({ isSubmitting: true });

    this.userService.updateUser(this.data.userId, this.userForm.getRawValue())
    .pipe(
      takeUntilDestroyed(this.destroyRef),
      finalize (() => {
        this.state.set({ isSubmitting: false });
      })
    )
    .subscribe({
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
    if (!this.state.get('isSubmitting')){
      this.dialogRef.close(false)
    }
  }
}
