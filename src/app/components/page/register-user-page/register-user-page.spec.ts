import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';

import { RegisterUserPage } from './register-user-page';

describe('RegisterUserPage', () => {
  let component: RegisterUserPage;
  let fixture: ComponentFixture<RegisterUserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterUserPage],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterUserPage);
    fixture.componentRef.setInput('userForm', new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    }));
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
