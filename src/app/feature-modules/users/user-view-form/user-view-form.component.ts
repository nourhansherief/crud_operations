import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-user-view-form',
  templateUrl: './user-view-form.component.html',
  styleUrls: ['./user-view-form.component.css']
})
export class UserViewFormComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UserViewFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {
   }

  ngOnInit() {
  }

}
