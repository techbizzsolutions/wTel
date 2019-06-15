import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  login(type)
  {
     switch (type) {
       case '0':
       case '1':
         this.navCtrl.push(LoginPage,{type:type});
         break;
      case '2':
         this.navCtrl.push('DashboardGuestPage');
         break;
     
       default:
         break;
     }
  }
}
