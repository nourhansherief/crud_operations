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


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, AfterViewInit {

  data: any;

  MyDataSource = new MatTableDataSource<any>([]);
  public displayedColumns = ['id', 'email', 'avater'];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
   
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
        console.log("sss" , data);
        this.resultsLength = data.total;
        return data.data;
      })
      ).subscribe(data => this.data = data);
  }
}



  // ngOnInit() {  
  //   this.RenderDataTable();  
  // } 

  //  ngAfterViewInit() {
  //   this.MyDataSource.paginator = this.paginator;
  //   // this.MyDataSource.sort = this.sort;
  // }

  // RenderDataTable() {  
  //   console.log("jjjjjjjjj");
  //   this.dataService.getUsers() 
  //     .subscribe(  
  //     (res:) => {  
  //       // this.MyDataSource = new MatTableDataSource(); 
  //       console.log("ddddddddddd"); 
  //       this.MyDataSource.data = res.data;  

  //     this.MyDataSource.sort= this.sort;
  //     this.MyDataSource.paginator=this.paginator;
  //       console.log("sssssss" , this.MyDataSource.data);  
  //     },  
  //     error => {  
  //       console.log('There was an error while retrieving Posts !!!' + error);  
  //     });  
  // }  


  // public displayedColumns = ['id', 'first_name', 'age', 'gender', 'created', 'personid'];
  // public pageSizeOptions = [5, 10, 20, 40, 100];
  // public pageSize = 20;
  // public dataSource;
  // public pageEvent: PageEvent;
  // public resultsLength = 0;
  // public page = 1;
  // public isLoading = false;
  // public isTotalReached = false;
  // public totalItems = 0;
  // public search = '';


  // constructor(
  //   private changeDetectorRef: ChangeDetectorRef,
  //   private userService: UserService,
  //   private router: Router,
  //   public dialog: MatDialog,
  //   public snack: MatSnackBar
  // ) {

  //   this.userService.getUsers().subscribe(data => {
  //     console.log("dd" , data);
  //     this.dataSource = new MatTableDataSource(data);
  //     // this.dataSource 
  //   });

  // }
  //  ngOnInit(): void {

  // }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  //   this.dataSource.sort = this.sort;
  // }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }




//   ngAfterViewInit() {
//     this.getUsers();
//   }


//   private openSnack(data: any): void {
//     // this.snack.openFromComponent(SnackbarComponent, {
//     //   data: { data: data },
//     //   duration: 3000
//     // });
//   }

//   public onPaginateChange(event: any): void {
//     this.page = event.pageIndex + 1;
//     this.pageSize = event.pageSize;
//     this.getData();
//   }

//   public applyFilter(filterValue: string): void {
//     // filterValue = filterValue.trim().toLowerCase();
//     // this.getData();
//   }

//  getUsers(): void {
//   //  this.employeeService.getAllEmployee().subscribe(data => {
//   //     this.dataSource = new MatTableDataSource(data);
//   //     this.dataSource.paginator = this.paginator;
//   //     this.dataSource.sort = this.sort;
//   //   });
//     // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

//     // merge(this.sort.sortChange, this.paginator.page)
//     //   .pipe(
//     //     startWith({}),
//     //     switchMap(() => {
//     //       this.isLoading = true;
//     //       return this.clientService.getList(
//     //         this.sort.active,
//     //         this.sort.direction,
//     //         this.pageSize,
//     //         this.page,
//     //         this.search
//     //       );
//     //     }),
//     //     map(data => {
//     //       this.isLoading = false;
//     //       this.isTotalReached = false;
//     //       this.totalItems = data.total;
//     //       return data.data;
//     //     }),
//     //     catchError(() => {
//     //       this.isLoading = false;
//     //       this.isTotalReached = true;
//     //       return observableOf([]);
//     //     })
//     //   ).subscribe(data => this.dataSource.data = data);
//   }

//   edit(client): void {
//     // this.clientService.getOne(client.id).subscribe((data: any) => {
//     //   if (data.success) {
//     //     const dialogRef = this.dialog.open(FormsComponent, {
//     //       width: '400px',
//     //       data: { title: 'Update person', action: 'edit', data: data.data }
//     //     });

//     //     dialogRef.afterClosed().subscribe(result => {
//     //       if (result) {
//     //         this.paginator._changePageSize(this.paginator.pageSize);
//     //       }
//     //     });
//     //   }
//     // });
//   }

//   save(): void {
//     // const dialogRef = this.dialog.open(FormsComponent, {
//     //   width: '400px',
//     //   data: { title: 'Add person', action: 'save' }
//     // });

//     // dialogRef.afterClosed().subscribe(result => {
//     //   if (result) {
//     //     this.paginator._changePageSize(this.paginator.pageSize);
//     //   }
//     // });
//   }

//   delete(client): void {
//     // const dialogRef = this.dialog.open(ConfirmComponent, {
//     //   width: '250px',
//     //   data: {
//     //     title: 'Delete record',
//     //     message: 'Are you sure you want to delete this record?'
//     //   }
//     // });

//     // dialogRef.afterClosed().subscribe(result => {
//     //   if (result) {
//     //     this.clientService.delete(client.id).subscribe((data: any) => {
//     //       this.openSnack(data);
//     //       if (data.success) {
//     //         this.paginator._changePageSize(this.paginator.pageSize);
//     //       }
//     //     });
//     //   }
//     // });
//   }

