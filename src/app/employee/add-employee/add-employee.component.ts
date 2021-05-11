import { EmployeeService } from 'src/app/service/employee.service';
//import { EmployeeService } from './../../service/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  data;
  today;
  constructor(private EmployeeService: EmployeeService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) { }

  createForm() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', []],//validatory to observable
      body: ['', []],
      //tags: ['1000222',[]],
      deadline:['', []],
      id:[this.EmployeeService.getHash(),[]]
    })
  }

  ngOnInit(): void {
    this.createForm()
    this.today=new Date()
   // this.EmployeeService.getDate();
  }

  get f() {
    //console.log("get f ",this.form.controls);
    return this.form.controls;
  }

  insertData() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
   // console.log("insert")
    //console.log(this.form.value);

    this.EmployeeService.insertData(this.form.value).subscribe(res => {
      this.data = res;
     // console.log("insert ",res)
      this.toastr.success('', "Zadanie zostało dodane",
        {
          timeOut: 1000,
          progressBar: true
        }
      );
      this.router.navigateByUrl('/')
    })
  }


}
