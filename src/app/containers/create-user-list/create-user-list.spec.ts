import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserList } from './create-user-list';

describe('CreateUserList', () => {
  let component: CreateUserList;
  let fixture: ComponentFixture<CreateUserList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserList],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUserList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
