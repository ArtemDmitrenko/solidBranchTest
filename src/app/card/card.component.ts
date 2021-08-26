import {Component, OnInit} from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRoute } from '@angular/router';
import {Subscription } from 'rxjs';

export interface IUser {
  type: 'income' | 'outcome' | 'loan' | 'investment';
  _id: string;
  amount: number;
  name: {
    first: string;
    last: string;
  };
  company: string;
  email: string;
  phone: string;
  address: string;
};

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [UserService]
})



export class CardComponent implements OnInit {

  private users: IUser[] = [];
  public usersWithType: IUser[] = [];
  public activeTab: string = '';
  public tabsNameArr: string[] = [];
  private tab!: number;
  private querySubscription: Subscription;

  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.querySubscription = route.queryParams.subscribe(
        (queryParam: any) => {
            this.tab = queryParam['tab'];
        }
    );
  } 

  public ngOnInit() {
    this.userService.getData().subscribe((data: any) => this.setView(data))

  }

  private setView(data: any) {
    this.users = data;
    this.tabsNameArr = this.userService.unique(this.users);
    this.tab = this.tab ? this.tab : 0;
    this.activeTab = this.tabsNameArr[this.tab];
    this.usersWithType = this.userService.setArrays(this.activeTab, this.userService, this.users);
  }

  public handleTabClick(tab: string): void {
    this.activeTab = tab;
    this.userService.getListOfTabItems(this.tab, this.tabsNameArr).subscribe((data: IUser[]) => this.usersWithType = data);
  }
}
