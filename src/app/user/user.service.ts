import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { IUser } from '../card/card.component';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {   
  }

  public getData(): Observable<IUser[]> {
    return this.http.get('../../assets/database.json').pipe(map((data: any) => {
      return data["data"];
    }),
    catchError(err => {
      console.log(err);
      return throwError(err)
    }));
  }

  public getListOfTabItems(id: number, tabNameArr: string[]) {
    return this.http.get('../../assets/database.json').pipe(map((data: any) => {
      return this.filterArr(data["data"], tabNameArr[id]);
    }),
    catchError(err => {
      console.log(err);
      return throwError(err)
    }));
  }

  public uniqueTypes(arr: IUser[]): string[] {
    let result: string[] = [];
    for (let item of arr) {
      if (!result.includes(item.type)) {
        result.push(item.type);
      }
    }
    [result[0], result[2]] = [result[2], result[0]];
    [result[1], result[2]] = [result[2], result[1]];
    return result;
  }

  public filterArr(arr: IUser[], type: string): IUser[] {
    return arr.filter((item: { type: string; }) => item.type == type);
  }
}
