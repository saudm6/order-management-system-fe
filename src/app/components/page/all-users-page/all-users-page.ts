import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from '../../../service/user-service';
import { UserData } from '../../../models/user-data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-users-page',
  imports: [RouterLink],
  templateUrl: './all-users-page.html',
  styleUrl: './all-users-page.css',
})
export class AllUsersPage implements OnInit {
  private userService = inject(UserService);

  readonly users = signal<UserData[]>([]);
  readonly totalCount = signal(0);
  readonly pageNumber = signal(1);
  readonly pageSize = signal(5);
  readonly isLoading = signal(false);
  readonly totalPages = signal(0);

  ngOnInit(): void {
    this.loadUsers();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.pageNumber.set(page);
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading.set(true);
    this.userService.getPagedUsers(this.pageNumber(), this.pageSize()).subscribe({
      next: (result) => {
        this.users.set(result.items);
        this.totalCount.set(result.totalCount);
        this.pageNumber.set(result.pageNumber);
        this.pageSize.set(result.pageSize);
        this.totalPages.set(result.totalPages);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading users:', error);
        this.isLoading.set(false);
      },
    });
  }
}
