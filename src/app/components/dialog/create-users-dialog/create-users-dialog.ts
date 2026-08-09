import { Component, inject, output, signal } from '@angular/core';
import { UserService } from '../../../service/user-service';
import { UserData } from '../../../models/user-data';
import { UserDetailsPage } from '../../page/user-details-page/user-details-page';
import { UserFormValue } from '../../../models/user-form-value';

@Component({
  selector: 'app-create-users-dialog',
  imports: [UserDetailsPage],
  templateUrl: './create-users-dialog.html',
  styleUrl: './create-users-dialog.css',
})
export class CreateUsersDialog {


  created = output<UserFormValue>();
  cancelled = output<void>();


  handleSubmit(value: UserFormValue): void{
    this.created.emit(value);
  }
}
