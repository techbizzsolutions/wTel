import { Component } from '@angular/core';
import { NavController, AlertController,ToastController, Events, NavParams } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';
import { Platform } from 'ionic-angular/platform/platform';
import { Uid } from '@ionic-native/uid';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private register : FormGroup;
  user:any;
  deviceId:any;
  constructor(public navCtrl: NavController,
    private loader: LoaderServiceProvider,
    public api: ApiProvider,
    public navPeram:NavParams,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public events: Events,
    public plt: Platform,
    private uid: Uid,
    private androidPermissions: AndroidPermissions,
    public formBuilder: FormBuilder
    ) {
      this.register = this.formBuilder.group({
        Password: ["", Validators.required],
        Username : ["", Validators.required]
      });
  }

  async getImei() {
    const { hasPermission } = await this.androidPermissions.checkPermission(
      this.androidPermissions.PERMISSION.READ_PHONE_STATE
    );
   
    if (!hasPermission) {
      const result = await this.androidPermissions.requestPermission(
        this.androidPermissions.PERMISSION.READ_PHONE_STATE
      );
   
      if (!result.hasPermission) {
        throw new Error('Permissions required');
      }
   
      // ok, a user gave us permission, we can get him identifiers after restart app
      return;
    }
   
     return this.uid.IMEI;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    this.plt.ready().then(() => {
      if(this.plt.is('cordova'))
      {
        this.deviceId = this.getImei();
        console.log(this.deviceId);
      }
      else{
       this.deviceId = {
        __zone_symbol__value:"1234567890"
       };
      }
   });
  }

  logForm()
  {
    console.log(this.register.value);

      this.loader.Show("Loading...");
      this.api.postWithoutEmp('login/api_login', {
        "user_type":parseInt(this.navPeram.data.type),
        "phone":parseInt(this.register.value.Username),
        "imei": parseInt(this.deviceId.__zone_symbol__value),
        "password":this.register.value.Password
        }).subscribe(res => {
        console.log('login/api_login',res);
        this.loader.Hide();
        if(res.authorization)
        {
          localStorage.setItem('user', JSON.stringify(res));
          this.events.publish('user:loggedIn');
          if(this.navPeram.data.type === '0')
          {
            this.navCtrl.setRoot('DashboardAgentPage');
          }
          else{
            this.navCtrl.setRoot('DashboardStudentPage');
          }
        }
        else{
          let toast = this.toastCtrl.create({
            message: res.message, 
            position: 'top',
            duration: 3000
          });
          toast.present();
        }
        
      }, err => {
        this.loader.Hide();
        console.log('login err',err);
        let toast = this.toastCtrl.create({
          message: 'Something went wrong, please try again', 
          position: 'top',
          duration: 3000
        });
        toast.present();
      })
    
  }
  
}