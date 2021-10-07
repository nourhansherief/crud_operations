import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-user-delete-form',
  templateUrl: './user-delete-form.component.html',
  styleUrls: ['./user-delete-form.component.css']
})
export class UserDeleteFormComponent implements OnInit {
  ngOnInit(): void {
    
  }

  constructor(
    public dialogRef: MatDialogRef<UserDeleteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

}
