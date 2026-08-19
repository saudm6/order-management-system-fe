import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUserPage } from './login-user-page';

describe('LoginUserPage', () => {
  let component: LoginUserPage;
  let fixture: ComponentFixture<LoginUserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginUserPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginUserPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
