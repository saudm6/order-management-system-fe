import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFormDetailsPage } from './user-form-details-page';

describe('UserFormDetailsPage', () => {
  let component: UserFormDetailsPage;
  let fixture: ComponentFixture<UserFormDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserFormDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UserFormDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
