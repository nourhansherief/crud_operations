import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDeleteFormComponent } from './user-delete-form.component';
import { SharedModule } from "src/app/shared/shared.module";
import { UserService } from "src/app/feature-modules/users/user.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AuthService } from "src/app/core/services/auth.service";
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('UserDeleteFormComponent', () => {
  let component: UserDeleteFormComponent;
  let fixture: ComponentFixture<UserDeleteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDeleteFormComponent ],
       imports:[FormsModule,ReactiveFormsModule , SharedModule , MatDialogModule,HttpClientModule,BrowserAnimationsModule],
      providers:[{
       provide: MatDialogRef,
       useValue: {}
     },
    { provide: MAT_DIALOG_DATA, useValue: {} },UserService , AuthService
    
    ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDeleteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
