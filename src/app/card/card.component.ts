import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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

  public usersWithDefType: IUser[] = [];
  public tabsNameArrForView: string[] = [];
  public tabsNameArr: string[] = [];
  public tabID!: number;
  private allUsers: IUser[] = [];
  error: any;
  private querySubscription: Subscription;


  constructor(private userService: UserService, private route: ActivatedRoute) {
    this.querySubscription = route.queryParams.subscribe(
        (queryParam: any) => {
            this.tabID = queryParam['tab'];
        }
    );
  } 

  public ngOnInit() {
    this.userService.getData().subscribe(
      (data: any) => this.setView(data),
      error => {this.error = error.message; console.log(error);}
    );
  }

  private setView(data: IUser[]): void {
    this.tabID = this.tabID ? this.tabID : 0;
    this.tabsNameArr = this.userService.uniqueTypes(data);
    this.tabsNameArrForView = this.setTabNamesForView(this.tabsNameArr);
    this.usersWithDefType = this.userService.filterArr(data, this.tabsNameArr[this.tabID]);
    this.allUsers = data;
  }

  public handleTabClick(index: number): void {
    this.tabID = index;
    this.usersWithDefType = this.userService.filterArr(this.allUsers, this.tabsNameArr[this.tabID]);
  }

  private setTabNamesForView(arr: string[]): string[] {
    return arr.map((item: string) => item[0].toUpperCase() + item.slice(1));
  }
}
