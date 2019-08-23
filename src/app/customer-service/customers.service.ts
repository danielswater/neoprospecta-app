import { Customers } from '../customers/customers.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API = 'http://private-92a969-processoseletivo1.apiary-mock.com/';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient) { }

  public getAllCustomers(){
    return this.http.get(`${API}customers`);
  }

  public putCustomer(object: Customers){
    return this.http.put(`${API}customers/${object.id}`, object, { headers: { 'Content-Type': 'application/json' } })
  }
}
