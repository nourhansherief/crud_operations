import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersComponent } from './users.component';
import { UsersListHeaderComponent } from "src/app/feature-modules/users/users-list-header/users-list-header.component";
import { UserService } from "src/app/feature-modules/users/user.service";
import { AuthService } from "src/app/core/services/auth.service";
import { RouterTestingModule } from "@angular/router/testing";

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent , UsersListHeaderComponent ],
      imports:[SharedModule , HttpClientModule , RouterTestingModule.withRoutes([])],
      providers:[UserService , HttpClient , AuthService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
