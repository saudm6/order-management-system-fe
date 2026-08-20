import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderLineItemList } from './add-order-line-item-list';

describe('AddOrderLineItemList', () => {
  let component: AddOrderLineItemList;
  let fixture: ComponentFixture<AddOrderLineItemList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrderLineItemList],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrderLineItemList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
