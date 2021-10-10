import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from './../../../core/services/auth.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewFormComponent } from './user-view-form.component';
import { SharedModule } from "src/app/shared/shared.module";
import { UserService } from "src/app/feature-modules/users/user.service";

import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

describe('UserViewFormComponent', () => {
  let component: UserViewFormComponent;
  let fixture: ComponentFixture<UserViewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserViewFormComponent],
      imports: [SharedModule, HttpClientModule, MatDialogModule],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },
      {
        provide: MAT_DIALOG_DATA, useValue:
          {
            data: {
              id: 1
            }
          }
      }, UserService, AuthService

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
