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

  constructor(private employeeService: EmployeeService,
    private cookieService: CookieService,
    private Router: Router
  ) { }

  ngOnInit(): void {

    if (this.cookieService.get('MEANT0DOL15T')) {
      const value = this.cookieService.get('MEANT0DOL15T');
      this.employeeService.setHash(value)
      this.getEmployeeData();
    }
    else {
      this.employeeService.getIPAddress().subscribe(res => {
        let expire = new Date();
        let time = Date.now() + ((3600 * 1000) * 24 * 120);
        expire.setTime(time);
        this.cookieService.set('MEANT0DOL15T', this.employeeService.makeHash(), expire);
        const value = this.cookieService.get('MEANT0DOL15T');
        this.getEmployeeData();

      })
    }
  }

  getEmployeeData() {
    this.employeeService.getData().subscribe(res => {
      this.employees = res['data'];
    })
  }

  deleteItem(item: string) {
    this.employeeService.deleteItem(item).subscribe(res => {
      this.Router.navigate(['/'])
      window.location.reload();
    })
  }


}
