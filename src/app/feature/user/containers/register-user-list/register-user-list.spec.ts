import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserList } from './register-user-list';

describe('RegisterUserList', () => {
  let component: RegisterUserList;
  let fixture: ComponentFixture<RegisterUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterUserList],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterUserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
