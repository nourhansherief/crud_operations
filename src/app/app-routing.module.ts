import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "src/app/core/guards/auth.guard";
import { LoginComponent } from "src/app/core/components/login.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import("./feature-modules/users/users.module").then(
        (u) => u.UsersModule
      )
  },
  // { path: '404', component: NotFoundComponent },
  // { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
