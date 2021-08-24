import {Component, OnInit} from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [UserService]
})

export class CardComponent implements OnInit {

  private users: any;
  public usersWithType: any;
  public activeTab!: string;
  public tabsArr!: string[];


  constructor(private userService: UserService) {} 

  public ngOnInit() {
    this.userService.getData().subscribe((data: any) => this.setView(data))
  }

  private setView(data: any) {
    this.users = data["data"];
    this.tabsArr = this.userService.unique(this.users);
    this.activeTab = this.tabsArr[0];
    this.usersWithType = this.userService.setArrays(this.activeTab, this.userService, this.users);
  }

  public handleTabClick(tab: string): void {
    this.activeTab = tab;
    this.usersWithType = this.userService.filterArr(this.users, tab[0].toLowerCase() + tab.slice(1));
  }
}
