import { SuccessMessage, ErrorMessage } from './../../../configurations/defines';
import { AuthService } from './../../core/services/auth.service';
import { UserViewFormComponent } from './user-view-form/user-view-form.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './user.service';
import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserDeleteFormComponent } from "src/app/feature-modules/users/user-delete-form/user-delete-form.component";
import { SnackbarComponent } from "src/app/core/components/snackbar/snackbar.component";



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {
  changeDetectorRefs: any;

  data: any;

  dataSource = new MatTableDataSource<any>([]);
  public displayedColumns = ['id', 'first_name', 'last_name', 'email', 'avater', 'actions'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private userService: UserService,
    public dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef, public snack: MatSnackBar
  ) { }

  ngOnInit(): void {

  }


  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
      startWith({}),
      switchMap(() => {
        this.isLoadingResults = true;
        return this.userService.getUsers(
          this.paginator.pageIndex)
          .pipe(catchError(() => observableOf(null)));
      }),
      map(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;
        if (data === null) {
          return [];
        }
        this.resultsLength = data.total;
        return data.data;
      })
      ).subscribe(data => this.dataSource.data = data);
  }

  openDeleteDialog(title, message, action) {
    return this.dialog.open(UserDeleteFormComponent, {
      data: {
        title,
        message,
        action
      }
    });
  }

  removeDeletedRecord(user) {
    let index = this.dataSource.data.indexOf(user);
    this.dataSource.data.splice(index, 1);
    this.dataSource = new MatTableDataSource(this.dataSource.data);
    this.resultsLength = this.resultsLength - 1;
  }

  delete(user): void {
    const dialogRef = this.openDeleteDialog('Delete record', 'Are you sure you want to delete this record?', 'delete');
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe((res: any) => {
          let data = {
            message: 'Record Has been Deleted Successfuly'
          }
          this.removeDeletedRecord(user);
          this.snack.openFromComponent(SnackbarComponent, {
            data: { data, ...SuccessMessage },
            duration: 3000
          });

        }, (err) => {
          let data = {
            message: 'Something Went Wrong'
          }
          this.snack.openFromComponent(SnackbarComponent, {
            data: { data, ...ErrorMessage },
            duration: 3000
          });
        });
      }
    });

  }

  openDialogForm(title, action, data) {
    const dialogRef = this.dialog.open(UserViewFormComponent, {
      data: { title: 'View User', action: 'view', data }
    });
  }

  view(user): void {
    this.userService.getSingleUser(user.id).subscribe((data: any) => {
      this.openDialogForm('View User', 'view', data.data);
    });
  }

  edit(user): void {
    this.userService.getSingleUser(user.id).subscribe((data: any) => {
      const dialogRef = this.dialog.open(UserFormComponent, {
        data: { title: 'Update User', action: 'edit', data: data.data }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (user) {
          let index = this.dataSource.data.findIndex((el) => {
            return el.id == user.id
          })
          this.dataSource.data[index] = { ...result };
          this.dataSource = new MatTableDataSource(this.dataSource.data);
        }
      });
    });
  }

  save(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data: { title: 'Add User', action: 'save' }
    });
    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        this.dataSource.data.push(user);
        this.dataSource = new MatTableDataSource(this.dataSource.data);
        this.resultsLength = this.resultsLength + 1;
      }
    });
  }





}


