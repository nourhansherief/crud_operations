import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SharedModule } from "src/app/shared/shared.module";
import { UserService } from "src/app/feature-modules/users/user.service";
import { AuthService } from "src/app/core/services/auth.service";
import { RouterTestingModule } from "@angular/router/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Observable } from "rxjs";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, HttpClientModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
      providers: [UserService, HttpClient, AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login user on the server', fakeAsync(() => {
    spyOn(component,'isFieldInvalid').withArgs('email').and.returnValue(true);
    // spyOn(component,'isFieldInvalid').withArgs('password').and.returnValue(true);
    // spyOnProperty(component,'form').and.returnValue({'valid':true});
    spyOn(authService, 'login').and.returnValue(
      new Observable((observer) => {
        observer.next({"token": "QpwL5tke4Pnpja7X4"});
        return observer;
      })
    );
    component.login();
    expect(component.isLogin).toBe(false);
  }));
});
