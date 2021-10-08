import { SharedModule } from './../shared/shared.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from "src/app/feature-modules/users/users.component";
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from "src/app/core/components/login.component";



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [AuthService]
})
export class CoreModule { }
