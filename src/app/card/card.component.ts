import {Component, OnInit} from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent implements OnInit {
  usersWithType: any;
  activeTab!: string;
  public users: any;
  public tabsArr!: string[];

  constructor(private _userService: UserService) {
  } 

  ngOnInit() {
    // this._userService.getAll().subscribe((users: any) => this.users = users.data);
    // console.log(this.users)
    this.users = this._userService.getAll()
    this.tabsArr = this.unique(this.users.data);
    this.activeTab = this.tabsArr[0];
    this.setArrays();
  }

  setArrays(): void {
    const activeTabLC = this.activeTab[0].toLowerCase() + this.activeTab.slice(1);    
    this.usersWithType = this.filterArr(activeTabLC);
  }

  filterArr(type: string): any {
    return this.users.data.filter((item: { type: string; }) => item.type == type);
  }

  handleTabClick(tab: string): void {
    this.activeTab = tab;
    this.usersWithType = this.filterArr(tab[0].toLowerCase() + tab.slice(1));
  }

  unique(arr: any): any {
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
}
