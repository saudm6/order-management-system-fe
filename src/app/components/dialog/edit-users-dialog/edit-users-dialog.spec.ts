import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUsersDialog } from './edit-users-dialog';

describe('EditUsersDialog', () => {
  let component: EditUsersDialog;
  let fixture: ComponentFixture<EditUsersDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditUsersDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditUsersDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
