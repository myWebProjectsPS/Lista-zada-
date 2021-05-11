import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

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
    private cookieService: CookieService,
    private Router: Router
  ) { }

  ngOnInit(): void {

    if (this.cookieService.get('MEANT0DOL15T')) {

      const value = this.cookieService.get('MEANT0DOL15T');
     // this.ClientIP = { ip: value }
     // this.employeeService.setClientIP(this.ClientIP.ip)
     this.employeeService.setHash(value)
      this.getEmployeeData();
      let c=Math.random().toString(36).substr(2, 9)+Math.random();
      console.log("kod ",Math.random().toString(36).substr(2, 9));
      console.log("kod mr",typeof(c));

    }
    else {
      this.employeeService.getIPAddress().subscribe(res => {

        let expire = new Date();
        let time = Date.now() + ((3600 * 1000) * 24 * 120);
        expire.setTime(time);

        //this.ClientIP = res//{ip:'192.45.65.15'}
        this.cookieService.set('MEANT0DOL15T', this.employeeService.makeHash(), expire);
        const value = this.cookieService.get('MEANT0DOL15T');

        //this.employeeService.setClientIP(this.ClientIP.ip)
        this.getEmployeeData();

      })
    }
  }

  getEmployeeData() {

    this.employeeService.getData().subscribe(res => {
      // console.log("compo ", this.key);
      this.employees = res['data'];

    })
  }

  deleteItem(item: string) {

    this.employeeService.deleteItem(item).subscribe(res => {

      // this.employees = res['data'];
      this.Router.navigate(['/'])
      window.location.reload();
    })
  }


}
