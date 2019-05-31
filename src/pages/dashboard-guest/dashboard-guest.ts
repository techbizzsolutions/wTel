import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';

@IonicPage()
@Component({
  selector: 'page-dashboard-guest',
  templateUrl: 'dashboard-guest.html',
})
export class DashboardGuestPage {
  guest = [];
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    private loader: LoaderServiceProvider,
    public toastCtrl: ToastController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardGuestPage');
    this.getGuest();
  }

  getGuest() {
    this.loader.Show("Loading...");
    this.api.get('api/get_guestpost').subscribe(res => {
      this.loader.Hide();
      console.log('this.get_guestpost', res);
      if (res.authorization) {
        this.guest = res.data;
      }
      else {
        let toast = this.toastCtrl.create({
          message: res.message,
          position: 'top',
          duration: 3000
        });
        toast.present();
      }

    }, err => {
      this.loader.Hide();
      console.log('login err', err);
      let toast = this.toastCtrl.create({
        message: 'Something went wrong, please try again',
        position: 'top',
        duration: 3000
      });
      toast.present();
    })
  }

  logout()
  {
    localStorage.clear();
    this.navCtrl.setRoot('WelcomePage');
  }
  
}
