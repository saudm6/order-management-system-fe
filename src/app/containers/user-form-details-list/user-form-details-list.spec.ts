import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormDetailsList } from './user-form-details-list';

describe('UserFormDetailsList', () => {
  let component: UserFormDetailsList;
  let fixture: ComponentFixture<UserFormDetailsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormDetailsList],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormDetailsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
