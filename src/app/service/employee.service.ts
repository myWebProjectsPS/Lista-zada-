import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  ClientIP;
  RemoteBackend='http://backendformean.herokuapp.com/'
  constructor(private HttpClient: HttpClient) { }


  getData() {
    //return this.HttpClient.get('http://localhost:3000/api/employees');
    //return this.HttpClient.get('http://itspabackend.herokuapp.com/users');
    // console.log("getData")
    // let ip=this.ClientIP.split("").reverse().join("");
    console.log("getData ")
    //return this.HttpClient.get('https://backendformean.herokuapp.com/two');
    return this.HttpClient.get(this.RemoteBackend+'all/' + this.makeHash())//("MEAN1(OO"+ip.replaceAll(".","SO")));
  }

  insertData(data) {
    //return this.HttpClient.post('http://itspabackend.herokuapp.com/users',data);
    //return this.HttpClient.post('https://backendformean.herokuapp.com/add',data);
    return this.HttpClient.post(this.RemoteBackend+'add', data);
  }

  getDataById(id) {
    //return this.HttpClient.get('http://localhost:3000/api/employees');
    return this.HttpClient.get(this.RemoteBackend+'one/' + id + "/" + this.makeHash());
  }

  updateData(id, data) {
    //return this.HttpClient.get('http://localhost:3000/api/employees');
    //return this.HttpClient.patch('http://itspabackend.herokuapp.com/users/'+id,data);
    return this.HttpClient.patch(this.RemoteBackend+'update/' + id, data, this.makeHash());
  }

  deleteItem(id) {
    //return this.HttpClient.get('http://localhost:3000/api/employees');
    //return this.HttpClient.patch('http://itspabackend.herokuapp.com/users/'+id,data);
    //let idAndHash=[id,this.makeHash()]
    return this.HttpClient.get(this.RemoteBackend+'delete/' + id + "/" + this.makeHash());
  }

  getIPAddress() {
    // this.HttpClient.get("http://api.ipify.org/?format=json").subscribe((res:any)=>{
    //   this.ClientIP = res.ip;
    // console.log("ip w serwis ",this.ClientIP)
    // return this.ClientIP
    // });

    return this.HttpClient.get("http://api.ipify.org/?format=json")
  }

  setClientIP(ip) {
    console.log("serrvie jest ip ", ip)
    this.ClientIP = ip
  }


  getClientIP() {
    return this.ClientIP;
  }

  makeHash() {
    let hash = this.ClientIP.split("").reverse().join("");
    hash = "MEAN1(OO" + hash.replaceAll(".", "SO");
    return hash
  }



}
