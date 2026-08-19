import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../service';
// import { Router } from '@angular/router';
import { UserData } from '../../models/user-data';
import { AllUsersPage } from '../../components/page/all-users-page/all-users-page';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditUsersDialog } from '../../components/dialog/edit-users-dialog/edit-users-dialog';
import { DeleteUserDialog } from '../../components/dialog/delete-user-dialog/delete-user-dialog';
import { Router } from '@angular/router';
import { rxState } from '@rx-angular/state';
import { finalize } from 'rxjs';

interface AllUserState {
  users: UserData[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  isLoading: boolean;
  totalPages: number;
}

@Component({
  selector: 'app-all-users-list',
  imports: [AllUsersPage, MatDialogModule],
  templateUrl: './all-users-list.html',
  styleUrl: './all-users-list.css',
})
export class AllUsersList implements OnInit {
  // inject rx state onto constructor

  private readonly dialog = inject(MatDialog);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  private readonly state = rxState<AllUserState>(({ set }) => {
    set({
      users: [],
      totalCount: 0,
      pageNumber: 1,
      pageSize: 5,
      isLoading: false,
      totalPages: 0,
    });
  });

  readonly users = this.state.signal('users');
  readonly totalCount = this.state.signal('totalCount');
  readonly pageNumber = this.state.signal('pageNumber');
  readonly pageSize = this.state.signal('pageSize');
  readonly isLoading = this.state.signal('isLoading');
  readonly totalPages = this.state.signal('totalPages');

  ngOnInit(): void {
    this.loadUsers();
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages()) {
      return;
    }

    this.state.set({ pageNumber: page });
    this.loadUsers();
  }

  changePageSize(pageSize: number): void {
    if (pageSize < 1) {
      return;
    }

    this.state.set({ pageSize: pageSize, pageNumber: 1 });
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
    this.state.set({ isLoading: true });
    this.userService.getPagedUsers(this.pageNumber(), this.pageSize())
    .pipe(
      finalize(() => {
        this.state.set({ isLoading: false });
      }),
    )
    .subscribe({
      next: (result) => {

        this.state.set({
          users: result.items,
          totalCount: result.totalCount,
          pageNumber: result.pageNumber,
          pageSize: result.pageSize,
          totalPages: result.totalPages
        });
      },
      error: (error) => {
        console.error('Error loading users:', error);
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
        this.state.set({ pageNumber: this.pageNumber() - 1, });
      }

      this.loadUsers();
    });
  }
}
