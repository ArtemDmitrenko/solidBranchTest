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

  public usersWithDefType: IUser[] = [];
  public tabsNameArrForView: string[] = [];
  public tabsNameArr: string[] = [];
  public tabID!: number;
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
    this.tabsNameArr = this.userService.uniqueTypes(data);
    this.tabsNameArrForView = this.setTabNamesForView(this.tabsNameArr);    
    this.tabID = this.tabID ? this.tabID : 0;
    this.usersWithDefType = this.userService.filterArr(data, this.tabsNameArr[this.tabID]);
  }

  public handleTabClick(index: number): void {
    this.tabID = index;    
    this.userService.getListOfTabItems(this.tabID, this.tabsNameArr).subscribe(
      (data: IUser[]) => this.usersWithDefType = data,
      error => {this.error = error.message; console.log(error);}
    );
  }

  private setTabNamesForView(arr: string[]): string[] {
    const setTabNamesForView = arr.map((item: string) => item[0].toUpperCase() + item.slice(1));
    const indexInvest = setTabNamesForView.indexOf('Investment');
    if (indexInvest !== -1) {
      setTabNamesForView[indexInvest] = 'Investments';
    }
    const indexLoan = setTabNamesForView.indexOf('Loan');
    if (indexLoan !== -1) {
      setTabNamesForView[indexLoan] = 'Loans';
    }    
    return setTabNamesForView;
  }
}
