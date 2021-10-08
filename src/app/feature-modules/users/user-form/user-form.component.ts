import { SnackbarComponent } from './../../../core/components/snackbar/snackbar.component';
import { UserService } from './../user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { SuccessMessage, ErrorMessage } from "src/configurations/defines";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  selectedFile: any;
  public frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    private userService: UserService,
    public snack: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.initializeForm();
  }


  private initializeForm() {
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;

    this.frm = this.fb.group({
      first_name: new FormControl(IS_EDITING ? data.first_name : null, [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl(IS_EDITING ? data.last_name : null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(IS_EDITING ? data.email : null, [Validators.required, Validators.minLength(3)]),
      avatar: new FormControl(IS_EDITING ? data.avatar : null),
      id: new FormControl(IS_EDITING ? data.id : null)
    });
  }

   openSnack(data, responseObject) {
    this.snack.openFromComponent(SnackbarComponent, {
      data: { data: data , ...responseObject },
      duration: 3000
    });
  }

  public save(form: FormGroup) {
    if (form.value.id == null) {
      this.userService.createNewUser({ ...form.value }).subscribe((res: any) => {
        this.dialogRef.close(true);
        this.openSnack({ message:'User has been Added Successfuly'} , SuccessMessage)
      },(err)=>{
          this.openSnack({ message:'Something Went Wrong'} , ErrorMessage)
      });
    } else {
      this.userService.updateUser({ ...form.value }).subscribe((data: any) => {
        this.dialogRef.close(data);
       this.openSnack({ message:'User has been Updated Successfuly'} , SuccessMessage)
      },(err)=>{
          this.openSnack({ message:'Something Went Wrong'} , ErrorMessage)
      });
    }
  }

  public getNameErrorMessage() {
    return this.frm.controls.first_name.hasError('required') ? 'First name is required' :
      this.frm.controls.first_name.hasError('minlength') ? 'Please enter a valid email ( at least 3 characters)' : '';
  }

  public getLastNameErrorMessage() {
    return this.frm.controls.last_name.hasError('required') ? 'Last name is required' :
      this.frm.controls.last_name.hasError('minlength') ? 'Please enter a valid email ( at least 3 characters)' : '';
  }

  public getEmailErrorMessage() {
    return this.frm.controls.email.hasError('required') ? 'Email is required' :
      this.frm.controls.email.hasError('minlength') ? 'Please enter a valid email ( at least 3 characters)' : '';
  }

  public getAvatarMessage() {
    return this.frm.controls.avatar.hasError('minlength') ? 'Please enter a valid email ( at least 3 characters)' : '';
  }


}
