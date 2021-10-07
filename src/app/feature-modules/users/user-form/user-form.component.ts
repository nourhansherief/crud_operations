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
  public frm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: any,
    private fb: FormBuilder,
    // private clientService: ClientService,
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
      age: new FormControl(IS_EDITING ? data.age : null, [Validators.required, Validators.minLength(1)]),
      gender: new FormControl(IS_EDITING ? data.gender : null, [Validators.required]),
      id: new FormControl(IS_EDITING ? data.id : null)
    });
  }

  public save(form: FormGroup) {
    // this.clientService.save(form.value).subscribe((data: any) => {
    //   // this.openSnack(data);

    //   if (data.success) {
    //     this.dialogRef.close(true);
    //   }
    // });
  }

  public getNameErrorMessage() {
    return this.frm.controls.first_name.hasError('required') ? 'First name is required' :
      this.frm.controls.name.hasError('minlength') ? 'Al menos 2 caracteres' : '';
  }

  public getLastNameErrorMessage() {
    return this.frm.controls.last_name.hasError('required') ? 'Last name is required' :
      this.frm.controls.name.hasError('minlength') ? 'Al menos 2 caracteres' : '';
  }

  public getAgeErrorMessage() {
    return this.frm.controls.age.hasError('required') ? 'Age is required' :
      this.frm.controls.age.hasError('minlength') ? 'Al menos un numero debe ser ingresado' : '';
  }

  public getGenderErrorMessage() {
    return this.frm.controls.gender.hasError('required') ? '' : '';
  }

}
