import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import json from '../../assets/database.json';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  public getAll() {
    return json;
  }
}
