import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  employees: any;
  ClientIP;
  //key:string;
  constructor(private employeeService: EmployeeService,
    private Router: Router
  ) { }

  ngOnInit(): void {
    //this.getEmployeeData();

    this.employeeService.getIPAddress().subscribe(res => {

      // this.getEmployeeData();
      //   console.log("ip ",res)
      this.ClientIP = res
      console.log("ip2 ", this.ClientIP.ip)
      this.employeeService.setClientIP(this.ClientIP.ip)
      this.getEmployeeData();
      // })
      //this.key='_' + Math.random().toString(36).substr(2, 9);
    })
  }

  getEmployeeData() {

    this.employeeService.getData().subscribe(res => {
      // console.log("compo ", this.key);
      this.employees = res['data'];

    })
  }

  deleteItem(item: string) {
    console.log("delete ", item)
    this.employeeService.deleteItem(item).subscribe(res => {
      console.log("delete ", res);
      // this.employees = res['data'];
      this.Router.navigate(['/'])
      window.location.reload();
    })
  }


}
