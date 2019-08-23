import { TestBed } from '@angular/core/testing';

import { Customers } from '../customers/customers.interface';
import { Injectable } from '@angular/core';

import { CustomersService } from './customers.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CustomersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports:[HttpClientTestingModule],
    declarations: [],
    providers: [CustomersService]
  }));

  it('should be created', () => {
    const service: CustomersService = TestBed.get(CustomersService);
    expect(service).toBeTruthy();
  });
});
