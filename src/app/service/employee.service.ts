import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  ClientIP;
  hash: any;
  RemoteBackend = 'http://backendformean.herokuapp.com/'
  constructor(private HttpClient: HttpClient) { }


  getData() {
    //return this.HttpClient.get('http://localhost:3000/api/employees');
    //return this.HttpClient.get('http://itspabackend.herokuapp.com/users');
    // console.log("getData")
    // let ip=this.ClientIP.split("").reverse().join("");
    console.log("getData ")
    //return this.HttpClient.get('https://backendformean.herokuapp.com/two');
    return this.HttpClient.get(this.RemoteBackend + 'all/' + this.getHash())//("MEAN1(OO"+ip.replaceAll(".","SO")));
  }

  insertData(data) {
    //return this.HttpClient.post('http://itspabackend.herokuapp.com/users',data);
    //return this.HttpClient.post('https://backendformean.herokuapp.com/add',data);
    return this.HttpClient.post(this.RemoteBackend + 'add', data);
  }

  getDataById(id) {
    //return this.HttpClient.get('http://localhost:3000/api/employees');
    return this.HttpClient.get(this.RemoteBackend + 'one/' + id + "/" + this.getHash());
  }

  updateData(id, data) {
    //return this.HttpClient.get('http://localhost:3000/api/employees');
    //return this.HttpClient.patch('http://itspabackend.herokuapp.com/users/'+id,data);
    return this.HttpClient.patch(this.RemoteBackend + 'update/' + id, data, this.getHash());
  }

  deleteItem(id) {
    //return this.HttpClient.get('http://localhost:3000/api/employees');
    //return this.HttpClient.patch('http://itspabackend.herokuapp.com/users/'+id,data);
    //let idAndHash=[id,this.makeHash()]
    return this.HttpClient.get(this.RemoteBackend + 'delete/' + id + "/" + this.getHash());
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
    //let hash = this.ClientIP.split("").reverse().join("");
    //hash = "MEAN1(OO" + hash.replaceAll(".", "SO");
    this.hash = "MEAN1(OO" + Math.random().toString(36).substr(2, 9) + Math.random();
    return this.hash
  }

  setHash(hashFromCookie) {
    this.hash = hashFromCookie;
  }

  getHash() {
    //console.log("hash z serv", this.hash)
    return this.hash

  }


}
