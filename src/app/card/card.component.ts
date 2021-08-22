import {Component, OnInit} from '@angular/core';
import json from '../../assets/database.json';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})

export class CardComponent implements OnInit {
  usersWithType: any;
  tabsArr: any;
  activeTab!: string;

  ngOnInit() {
    this.tabsArr = this.unique(json.data);
    this.activeTab = this.tabsArr[0];
    this.setArrays();
  }

  setArrays(): void {
    const activeTabLC = this.activeTab[0].toLowerCase() + this.activeTab.slice(1);    
    this.usersWithType = this.filterArr(activeTabLC);
  }

  filterArr(type: string): any {
    return json.data.filter(item => item.type == type);
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
