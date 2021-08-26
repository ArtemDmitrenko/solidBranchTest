import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../card/card.component';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {   
  }

  public getListOfTabItems(id: number, tabNameArr: string[]) {
    return this.http.get('../../assets/database.json').pipe(map((data: any) => {
      const tabNameArrLowerCase = tabNameArr.map((item: string) => item[0].toLowerCase() + item.slice(1));
      return this.filterArr(data["data"], tabNameArrLowerCase[id]);
    }));
  }

  public getData() {
    return this.http.get('../../assets/database.json').pipe(map((data: any) => {
      return data["data"];
    }));
  }

  public unique(arr: any): any {
    let result: any = [];
    for (let item of arr) {
      if (!result.includes(item.type)) {
        result.push(item.type);
      }
    }
    [result[0], result[2]] = [result[2], result[0]];
    [result[1], result[2]] = [result[2], result[1]];
    return result.map((item: string) => item[0].toUpperCase() + item.slice(1));
  }

  public setArrays(activeTab: any, userService: any, userArr: any): any {
    const activeTabLC = activeTab[0].toLowerCase() + activeTab.slice(1);    
    return userService.filterArr(userArr, activeTabLC);
  }

  public filterArr(arr: any, type: string): any {
    return arr.filter((item: { type: string; }) => item.type == type);
  }
}
