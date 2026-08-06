import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUsersPage } from './all-users-page';

describe('AllUsersPage', () => {
  let component: AllUsersPage;
  let fixture: ComponentFixture<AllUsersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllUsersPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AllUsersPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
