import { EmployeeService } from 'src/app/service/employee.service';
//import { EmployeeService } from './../service/employee.service';
import { ToastrService } from 'ngx-toastr';
//import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
//import { ThrowStmt } from '@angular/compiler';
import { Employee } from '../model/employee.model';



@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employee = new Employee();
  id: any;
  data: any;
  idInDB: any;
  today:any;

  form = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    body: new FormControl(''),
    deadline:new FormControl('')
  })


  constructor(private EmployeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute, private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.getData();
    this.idInDB = this.EmployeeService.makeHash()
    this.today=new Date()
  }

  getData() {
    this.EmployeeService.getDataById(this.id).subscribe(res => {
      this.data = res;
      this.employee = this.data;
      console.log("form ", this.data['data'][0].title)
      this.form = new FormGroup({
        title: new FormControl(this.data['data'][0].title, this.employee.title),
        description: new FormControl(this.data['data'][0].description, this.employee.description),
        body: new FormControl(this.data['data'][0].body, this.employee.body),// ? this.employee.body : 1050)
        deadline:new FormControl(this.data['data'][0].deadline, this.employee.deadline),
        id: new FormControl(this.data['data'][0].id, this.employee.id)
      })

    }
    )
  }

  updateData() {
    console.log("update: ", this.id, this.form.value)
    this.EmployeeService.updateData(this.id, this.form.value).subscribe(res => {
      this.data = res;
      this.toaster.success("json1", "json2"), {
        timeOut: 2000,
        progressBar: true
      }
      this.router.navigate(['/']);
    })

  }

}
