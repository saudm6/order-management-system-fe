import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderLineItemPage } from './add-order-line-item-page';

describe('AddOrderLineItemPage', () => {
  let component: AddOrderLineItemPage;
  let fixture: ComponentFixture<AddOrderLineItemPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOrderLineItemPage],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOrderLineItemPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
