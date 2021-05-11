import { EmployeeService } from 'src/app/service/employee.service';
//import { EmployeeService } from './../service/employee.service';
import { ToastrService } from 'ngx-toastr';
//import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  submitted = false;


  form = this.formBuilder.group({
    title: new FormControl('',Validators.required),
    description: new FormControl(''),
    body: new FormControl(''),
    deadline:new FormControl('')
  })


  constructor(private EmployeeService: EmployeeService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, private toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    //console.log(this.id);
    this.getData();
    this.idInDB = this.EmployeeService.getHash()
    this.today=new Date()
  }

  getData() {
    this.EmployeeService.getDataById(this.id).subscribe(res => {
      this.data = res;
      this.employee = this.data;
      //console.log("form ", this.data['data'][0].title)
      this.form = new FormGroup({
        title: new FormControl(this.data['data'][0].title, Validators.required),
        description: new FormControl(this.data['data'][0].description, this.employee.description),
        body: new FormControl(this.data['data'][0].body, this.employee.body),// ? this.employee.body : 1050)
        deadline:new FormControl(this.data['data'][0].deadline, this.employee.deadline),
        id: new FormControl(this.data['data'][0].id, this.employee.id)
      })

    }
    )
  }

  get f() {
    //console.log("get f z editu ",this.form.get('title'));
   //return this.form.controls;
   return this.form.get('title');
  }


  updateData() {
    this.submitted = true;
    if (this.form.invalid){
      return;
    }
    //console.log("update: ", this.id, this.form.value)
    this.EmployeeService.updateData(this.id, this.form.value).subscribe(res => {
      this.data = res;
      this.toaster.success("", "Zmiany zostały zapisane", {
        timeOut: 1000,
        progressBar: true
      })
      this.router.navigate(['/']);
    })

  }

}
