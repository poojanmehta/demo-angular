import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  constructor(private _http: HttpClient) { }

  private httpUrl = 'http://localhost:3000/userinfo/';
  private header = 'Content-Type';
  private value = 'application/json';

  // fetch all users
  getAllUsers() {
    return this._http.get(this.httpUrl);
  }

  addUser(obj: FormGroup) {
    const body = JSON.stringify(obj);
    console.log(body);
    const head = new HttpHeaders().set(this.header, this.value);
    return this._http.post(this.httpUrl, body, { headers: head });
  }

  // delte user based on user id
  deleteUser(user_id: number) {
    return this._http.delete(this.httpUrl + user_id);
  }

  // fetch data with user id, user id is being send as url
  getUserById(user_id: number) {
    return this._http.get(this.httpUrl+user_id);
  }

  // update user, sending form data as body and user id as url
  updateUser(obj: FormGroup, user_id: number) {
    const body = JSON.stringify(obj);
    console.log(body);
    const head = new HttpHeaders().set(this.header, this.value);
    return this._http.put(this.httpUrl + user_id, body, { headers: head });
  }

}
