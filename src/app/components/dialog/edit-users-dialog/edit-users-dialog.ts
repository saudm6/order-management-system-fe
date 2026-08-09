import { Component, output, input } from '@angular/core';
import { UserDetailsPage } from '../../page/user-details-page/user-details-page';
import { UserFormValue } from '../../../models/user-form-value';
import { UserData } from '../../../models';

@Component({
  selector: 'app-edit-users-dialog',
  imports: [UserDetailsPage],
  templateUrl: './edit-users-dialog.html',
  styleUrl: './edit-users-dialog.css',
})
export class EditUsersDialog {
  
  readonly user = input.required<UserData>();
  readonly isSubmitting = input(false);

  readonly updated = output<UserFormValue>();
  readonly cancelled = output<void>();

  handleEditValued(value: UserFormValue): void {
    this.updated.emit(value);
  }
}
