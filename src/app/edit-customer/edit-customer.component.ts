import { Customers } from './../customers/customers.interface';
import { CustomersService } from '../customer-service/customers.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.scss']
})
export class EditCustomerComponent implements OnInit {

  customer: Customers;
  form: FormGroup;
  constructor(private formBuilder: FormBuilder, private route:ActivatedRoute,private router:Router, private service: CustomersService) { }

  ngOnInit() {
    this.customer = JSON.parse(localStorage.getItem("customer"));
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      age: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]],
      city: [null, Validators.required],
    })
  }

  private updatecustomer(){
    this.service.putCustomer(this.customer).subscribe(data => {
      if(data){
        console.log('customers', this.customer)
        localStorage.clear();
        localStorage.setItem('edit-customer', JSON.stringify(this.customer))
        this.router.navigate(['']);
      }
    })
  }

  private cancel(){
    if(localStorage.getItem("edit-customer") === null){
      localStorage.clear();
    }
    this.router.navigate(['']);
  }

}
