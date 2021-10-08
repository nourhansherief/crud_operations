import { UserService } from './../user.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

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

  // openSnack(data: any) {
  //   this.snack.openFromComponent(SnackbarComponent, {
  //     data: { data: data },
  //     duration: 3000
  //   });
  // }

  private initializeForm() {
    const IS_EDITING = this.data.action === 'edit';
    const data = this.data.data;

    this.frm = this.fb.group({
      first_name: new FormControl(IS_EDITING ? data.first_name : null, [Validators.required, Validators.minLength(3)]),
      last_name: new FormControl(IS_EDITING ? data.last_name : null, [Validators.required, Validators.minLength(3)]),
      email: new FormControl(IS_EDITING ? data.email : null, [Validators.required, Validators.minLength(1)]),
      avatar: new FormControl(IS_EDITING ? data.avatar : null),
      id: new FormControl(IS_EDITING ? data.id : null)
    });
  }

  public upload($event)
  {
    this.selectedFile = $event.target.files[0]['name'];
  }

  public save(form: FormGroup) {
    this.userService.createNewUser({ ...form.value , avatar:this.selectedFile}).subscribe((data: any) => {
      // this.openSnack(data);

      // if (data.success) {
      this.dialogRef.close(true);
      // }
    });
  }

  public getNameErrorMessage() {
    return this.frm.controls.first_name.hasError('required') ? 'First name is required' :
      this.frm.controls.first_name.hasError('minlength') ? 'Al menos 2 caracteres' : '';
  }

  public getLastNameErrorMessage() {
    return this.frm.controls.last_name.hasError('required') ? 'Last name is required' :
      this.frm.controls.last_name.hasError('minlength') ? 'Al menos 2 caracteres' : '';
  }

  public getEmailErrorMessage() {
    return this.frm.controls.email.hasError('required') ? 'Email is required' :
      this.frm.controls.email.hasError('minlength') ? 'Al menos un numero debe ser ingresado' : '';
  }

  // public getAvatarMessage(){
  //   return this.frm.controls.avatar.hasError('required') ? 'Email is required' :
  //     this.frm.controls.avatar.hasError('minlength') ? 'Al menos un numero debe ser ingresado' : '';
  // }


}
