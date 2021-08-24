import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {Routes, RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { UserService } from './user/user.service';

const appRoutes: Routes =[
  { path: 'navigator', component: CardComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
