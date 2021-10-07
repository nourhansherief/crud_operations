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

  constructor(private userService: UserService, public dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef, ) { }

  ngOnInit(): void {

  }

  ngAfterViewChecked() {

  }

  ngAfterViewInit() {

    // If the user changes the sort order, reset back to the first page.
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
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = data === null;

        if (data === null) {
          return [];
        }

        // Only refresh the result length if there is new data. In case of rate
        // limit errors, we do not want to reset the paginator to zero, as that
        // would prevent users from re-triggering requests.
        this.resultsLength = data.total;
        return data.data;
      })
      ).subscribe(data => this.dataSource.data = data);
  }

  delete(user): void {
    const dialogRef = this.dialog.open(UserDeleteFormComponent, {
      data: {
        title: 'Delete record',
        message: 'Are you sure you want to delete this record?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.deleteUser(user.id).subscribe((data: any) => {
          let index = this.dataSource.data.indexOf(user);
          this.dataSource.data.splice(index, 1);
          this.dataSource = new MatTableDataSource(this.dataSource.data);
          this.resultsLength = this.resultsLength - 1;
        });
      }
    });

  }

  edit(user): void {
    this.userService.getSingleUser(user.id).subscribe((data: any) => {
      console.log("ssssss", data);
      const dialogRef = this.dialog.open(UserFormComponent, {
        data: { title: 'Update User', action: 'edit', data: data.data }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.paginator._changePageSize(this.paginator.pageSize);
        }
      });
    });
  }

  view(user): void {
    this.userService.getSingleUser(user.id).subscribe((data: any) => {
      console.log("ssssss", data);
      const dialogRef = this.dialog.open(UserViewFormComponent, {
        data: { title: 'View User', action: 'view', data: data.data }
      });
    });
  }



  // save(): void {
  //   const dialogRef = this.dialog.open(FormsComponent, {
  //     width: '400px',
  //     data: { title: 'Add person', action: 'save' }
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.paginator._changePageSize(this.paginator.pageSize);
  //     }
  //   });
  // }



}


