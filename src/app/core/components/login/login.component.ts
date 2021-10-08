import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackbarComponent } from "src/app/core/components/snackbar/snackbar.component";
import { ErrorMessage } from "src/configurations/defines";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public isLogin = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public snack: MatSnackBar,
  ) { }

  ngOnInit() {
    this.initLoginForm();
  }

  // form Validations
  private initLoginForm(): void {
    this.form = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
        ]
      ],
      password: [
        null,
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ]
    });
  }

  public isFieldInvalid(field: string) {
    if (this.form.get(field).touched) {
      return !this.form.get(field).valid;
    }
  }
  // if user login successfully redirect to users page
  public login() {
    if (this.form.valid) {
      this.isLogin = true;
      this.authService.login(this.form.value).subscribe(
        (data: any) => {
          this.isLogin = false;
          this.authService.loggedIn.next(true);
          localStorage.setItem('token', data.token);
          this.router.navigate(['/users']);
        },
        (error) => {
          error.message = ` Error Happened !! ${error.error.error}`;
          this.isLogin = false;
          this.snack.openFromComponent(SnackbarComponent, {
            data: { data: error  , ...ErrorMessage},
            duration: 3000
          });
        }
      );
    }
  }

}
