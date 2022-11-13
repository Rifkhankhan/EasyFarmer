import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {tap,take,map, switchMap, catchError} from 'rxjs/operators'
import { AuthService } from '../login/auth.service';

//npm install crypto-js
@Injectable({
  providedIn: 'root'
})
export class UserService {
  getAllProducts: any;
  _products: any;
  encrypyKey = 'greenproject'
  constructor(private http:HttpClient,private authentication:AuthService) { }
  readonly url = "http://localhost:8100/users";

  private _users = new BehaviorSubject([])

  getAllUser()
  {
    return this._users.asObservable();
  }




}

