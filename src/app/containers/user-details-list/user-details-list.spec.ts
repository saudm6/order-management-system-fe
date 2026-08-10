import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsList } from './user-details-list';

describe('UserDetailsList', () => {
  let component: UserDetailsList;
  let fixture: ComponentFixture<UserDetailsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsList],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
