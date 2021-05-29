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
    return this.HttpClient.get(this.RemoteBackend + 'all/' + this.getHash())//("MEAN1(OO"+ip.replaceAll(".","SO")));
  }

  insertData(data) {
    return this.HttpClient.post(this.RemoteBackend + 'add', data);
  }

  getDataById(id) {
    return this.HttpClient.get(this.RemoteBackend + 'one/' + id + "/" + this.getHash());
  }

  updateData(id, data) {
    return this.HttpClient.patch(this.RemoteBackend + 'update/' + id, data, this.getHash());
  }

  deleteItem(id) {
    return this.HttpClient.get(this.RemoteBackend + 'delete/' + id + "/" + this.getHash());
  }

  getIPAddress() {
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
    this.hash = "MEAN1(OO" + Math.random().toString(36).substr(2, 9) + Math.random();
    return this.hash
  }

  setHash(hashFromCookie) {
    this.hash = hashFromCookie;
  }

  getHash() {
    return this.hash
  }


}
