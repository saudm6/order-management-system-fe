import { Component, computed, inject, OnInit, } from '@angular/core';
import { OrderResponse } from '../../models';
import { rxState, RxState } from '@rx-angular/state';
import { Observable } from 'rxjs';
import { OrderService } from '../../service/order.service';
import { Router } from '@angular/router';
import { DisplayOrderPage } from '../../components/display-order-page/display-order-page';
import { AsyncPipe } from '@angular/common';


interface DisplayOrderListState {
  orderListResponse: OrderResponse[];
  errorMessage: string;
}

type ViewModel = DisplayOrderListState;

@Component({
  selector: 'app-display-order-list',
  imports: [DisplayOrderPage, AsyncPipe],
  providers: [RxState],
  templateUrl: './display-order-list.html',
  styleUrl: './display-order-list.css',
})
export class DisplayOrderList {

  private readonly state = rxState<DisplayOrderListState>();

  vm$: Observable<ViewModel>;

  readonly router = inject(Router);
  readonly orderService = inject(OrderService)

  constructor() {
    this.state.set({ 
      orderListResponse: [],
      errorMessage: '',
    });

    this.state.connect('orderListResponse', this.orderService.getOrder());

    this.vm$ = this.state.select();
  }
}
