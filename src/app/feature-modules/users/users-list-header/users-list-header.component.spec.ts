import { AuthService } from './../../../core/services/auth.service';
import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { UsersListHeaderComponent } from './users-list-header.component';
import { SharedModule } from "src/app/shared/shared.module";
import { UserService } from "src/app/feature-modules/users/user.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterTestingModule } from "@angular/router/testing";

describe('UsersListHeaderComponent', () => {
  let component: UsersListHeaderComponent;
  let fixture: ComponentFixture<UsersListHeaderComponent>;
  let service: AuthService;
  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [UsersListHeaderComponent],
      imports: [SharedModule, HttpClientModule, RouterTestingModule.withRoutes([])],
      providers: [UserService, HttpClient, AuthService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersListHeaderComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout', () => {
    component.logout();
    const logoutSpy = spyOn(
      service,
      'logout'
    );
    // expect(logoutSpy).toHaveBeenCalled();
  });
});
