import { AuthService } from 'src/app/core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './../user.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormComponent } from './user-form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      imports:[FormsModule, ReactiveFormsModule , SharedModule ,
         MatDialogModule,HttpClientModule,BrowserAnimationsModule],
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
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
