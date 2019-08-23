import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Customers } from './customers.interface'
import { CustomersService } from '../customer-service/customers.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'age', 'city','actions'];
  dataSource: MatTableDataSource<Customers>;
  customers: Customers[] = [];
  obs: Observable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _snackBar: MatSnackBar, private route:ActivatedRoute,private router:Router, private service: CustomersService) {

    this.service.getAllCustomers().subscribe((data: Customers[]) => {
      this.customers = data;
      if(localStorage.getItem("edit-customer") !== null){
        let _customer = JSON.parse(localStorage.getItem("edit-customer"))
        for(let i = 0; i < this.customers.length; i++){
          if(this.customers[i].id == _customer.id){
            this.customers[i].name = _customer.name;
            this.customers[i].age= _customer.age;
            this.customers[i].city = _customer.city;
          }
        }
        this._snackBar.open(_customer.name + " atualizado com sucesso!", "", {
          duration: 5000,
          verticalPosition: 'top',
        });
      }
      this.dataSource = new MatTableDataSource(this.customers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.obs = this.dataSource.connect();
    });
  }

  ngOnInit(){

  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
    console.log(this.dataSource.filter)
  }

  public editCustomer(val){
    localStorage.setItem("customer", JSON.stringify(val));
    this.router.navigate(['/edit-customer']);
  }

}
