import { Component, inject, OnInit, signal, input, output } from '@angular/core';
import { UserService } from '../../../service/user-service';
import { UserData } from '../../../models/user-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-users-page',
  imports: [],
  templateUrl: './all-users-page.html',
  styleUrl: './all-users-page.css',
})
export class AllUsersPage {

  readonly users = input.required<readonly UserData[]>();
  readonly isLoading = input(false);
  readonly pageNumber = input(1);
  readonly totalPages = input(1);
  readonly pageSize = input(3);
  readonly totalCount = input(1);

  readonly registerUser = output<void>();
  readonly editUser = output<string>();
  readonly deleteUser = output<string>();
  readonly pageChange = output<number>();
  readonly pageChangeSize = output<number>();

}
