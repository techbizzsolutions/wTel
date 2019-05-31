import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular/platform/platform';
import { ToastController, Nav } from 'ionic-angular';
import 'rxjs/add/observable/of';
import { LoginPage } from '../../pages/login/login';

@Injectable()
export class ApiProvider {
  @ViewChild(Nav) nav: Nav;
  onDevice: boolean;
  user:any;
  //private host: String = 'http://neoconcepts.ddns.net:8080/adminDashboard/';
  public host: String = 'http://www.linawb.com/adminp/';
  constructor(private http: HttpClient, private network: Network, public plt: Platform, public toastProvider: ToastController) {
    this.plt.ready().then(() => {
      this.onDevice = this.plt.is('cordova');
    });
  }

  post(url, data): Observable<any> {
    this.user = JSON.parse(localStorage.getItem('user'));
    if(!this.user)
    {
       this.nav.setRoot(LoginPage);
       return
    }

    let rowdata = data;
    rowdata.user_id = this.user.user_id;
    rowdata.user_type = this.user.user_type;
    console.log(url, rowdata);
    if (this.isOnline()) {
      return this.http.post<any>(this.host + url, rowdata);
    }
    else {
      console.log("not connected");
      let toast = this.toastProvider.create({
        message: "You are not connected to the internet",
        position: 'top',
        duration: 3000
      });
      toast.present();
      return Observable.of({ authorization: false, message: "You are not connected to the internet", data: [] });
    }

  }

  postWithoutEmp(url, data): Observable<any> {
    console.log(url, data);
    if (this.isOnline()) {
      return this.http.post<any>(this.host + url, data);
    }
    else {
      console.log('not connected');
      let toast = this.toastProvider.create({
        message: "You are not connected to the internet",
        position: 'top',
        duration: 3000
      });
      toast.present();
      return Observable.of({ error: '2', message: "You are not connected to the internet", data: [] });

    }

  }

  get(url): Observable<any> {
    console.log(url);
    if (this.isOnline()) {
      return this.http.get<any>(this.host + url);
    }
    else {
      console.log('not connected');
      let toast = this.toastProvider.create({
        message: "You are not connected to the internet",
        position: 'top',
        duration: 3000
      });
      toast.present();
      return Observable.of({ error: '2', message: "You are not connected to the internet", data: [] });

    }

  }

  isOnline(): Boolean {
    console.log('this.network.type', this.network.type);
    if (this.onDevice) {
      if (this.network.type == 'none') {
        return false;
      } else {
        return true;
      }
    } else {
      return true; // true since its not a device
     }
    }
}
