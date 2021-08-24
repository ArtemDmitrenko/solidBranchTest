import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {   
  }

  public getData() {
    return this.http.get('../../assets/database.json');
  }

  public unique(arr: any): any {
    console.log(arr);
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

  public setArrays(activeTab: any, userService: any, userArr: any): void {
    const activeTabLC = activeTab[0].toLowerCase() + activeTab.slice(1);    
    return userService.filterArr(userArr, activeTabLC);
  }

  public filterArr(arr: [], type: string): any {
    return arr.filter((item: { type: string; }) => item.type == type);
  }
}
