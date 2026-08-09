import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUsersDialog } from './create-users-dialog';

describe('CreateUsersDialog', () => {
  let component: CreateUsersDialog;
  let fixture: ComponentFixture<CreateUsersDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUsersDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUsersDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
