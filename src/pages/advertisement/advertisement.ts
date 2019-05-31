import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-advertisement',
  templateUrl: 'advertisement.html',
})
export class AdvertisementPage {
  advertise:any;
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    private loader: LoaderServiceProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController, public navParams: NavParams) {
  }

  getAdbertise() {
    this.loader.Show("Loading...");
    this.api.postWithoutEmp('api/get_advertisement',{
    }).subscribe(res => {
      this.loader.Hide();
      console.log('this.get_advertisement', res);
      if (res.authorization) {
        this.advertise = res.data;
        this.advertise =  this.advertise[Math.floor(Math.random() *  this.advertise.length)];
        this.advertise.banner_image = this.api.host+"uploads/images/"+this.advertise.banner_image;
        console.log('this.get_advertisement',  this.advertise);
        setTimeout(() => {      
          console.log('timer');
          let user = JSON.parse(localStorage.getItem('user'));
          if (user) {
            if(user.user_type == "0")
          {
            this.navCtrl.setRoot('DashboardAgentPage');
          }
          else{
            this.navCtrl.setRoot('DashboardStudentPage');
          }
          }else{
            this.navCtrl.setRoot('WelcomePage');
          }
        },parseInt(this.advertise.timefor_show)*1000);
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvertisementPage');
    this.getAdbertise();

  }

}
