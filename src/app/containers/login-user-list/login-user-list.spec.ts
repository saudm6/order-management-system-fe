import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserList } from './login-user-list';

describe('LoginUserList', () => {
  let component: LoginUserList;
  let fixture: ComponentFixture<LoginUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUserList],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginUserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
