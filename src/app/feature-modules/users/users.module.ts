import { UserService } from './user.service';
import { SharedModule } from './../../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from "src/app/feature-modules/users/users.component";
import { HttpClientModule } from "@angular/common/http";
import { UserFormComponent } from './user-form/user-form.component';
import { UserDeleteFormComponent } from './user-delete-form/user-delete-form.component';
import { UserViewFormComponent } from './user-view-form/user-view-form.component';



@NgModule({
  declarations: [UsersComponent, UserFormComponent, UserDeleteFormComponent, UserViewFormComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  entryComponents: [
     UserFormComponent, UserDeleteFormComponent , UserViewFormComponent
  ],
  providers: [UserService]
})
export class UsersModule { }
