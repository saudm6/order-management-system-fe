import { Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterUserPage } from '../../../user/components/page/register-user-page/register-user-page';
import { AuthService } from '../../../../shared/service';
import { rxState } from '@rx-angular/state';
import { finalize } from 'rxjs';
import { contains } from '../../../../shared/functions/index';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {}
