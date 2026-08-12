import { Component, inject, OnInit, signal } from '@angular/core';
import { UserService } from './../../service/index';
// import { Router } from '@angular/router';
import { UserData } from '../../models/user-data';
import { AllUsersPage } from '../../components/page/all-users-page/all-users-page';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditUsersDialog } from '../../components/dialog/edit-users-dialog/edit-users-dialog';
import { DeleteUserDialog } from '../../components/dialog/delete-user-dialog/delete-user-dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users-list',
  imports: [AllUsersPage, MatDialogModule],
  templateUrl: './all-users-list.html',
  styleUrl: './all-users-list.css',
})
export class AllUsersList implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

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

  changePageSize(pageSize: number): void {
    if (pageSize < 1) {
      return;
    }
    this.pageSize.set(pageSize);
    this.pageNumber.set(1);
    this.loadUsers();
  }

  registerUser(): void {
    this.router.navigate(['users/register']);
  }

  editUser(userId: string): void {
    const dialogRef = this.dialog.open(EditUsersDialog, {
      width: '720px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      disableClose: true,

      data: { userId },
    });
    dialogRef.afterClosed().subscribe((updated: boolean) => {
      if (updated) {
        this.loadUsers();
      }
    });
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
  deleteUser(userId: string): void {
    const user = this.users().find((item) => item.id === userId);

    const userName = user?.fullName ?? 'this user';

    const dialogRef = this.dialog.open(DeleteUserDialog, {
      width: '460px',
      maxWidth: '95vw',
      disableClose: true,
      data: {
        userId,
        userName,
      },
    });

    dialogRef.afterClosed().subscribe((deleted: boolean) => {
      if (!deleted) {
        return;
      }

      if (this.users().length === 1 && this.pageNumber() > 1) {
        this.pageNumber.update((page) => page - 1);
      }

      this.loadUsers();
    });
  }
}
