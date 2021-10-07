import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewFormComponent } from './user-view-form.component';

describe('UserViewFormComponent', () => {
  let component: UserViewFormComponent;
  let fixture: ComponentFixture<UserViewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewFormComponent ]
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
