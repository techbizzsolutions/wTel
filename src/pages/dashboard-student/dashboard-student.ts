import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-dashboard-student',
  templateUrl: 'dashboard-student.html',
})
export class DashboardStudentPage {
  segment="study";
  medium:any;
  class:any;
  chapter:any;
  board:any;
  subject=[];
  services=[];
  skills =[];
  user:any;
  admin:any;
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    private loader: LoaderServiceProvider,
    public navPeram: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController, public navParams: NavParams) {
      this.user = JSON.parse(localStorage.getItem('user'));
  }

  logout()
  {
    localStorage.clear();
    this.navCtrl.setRoot('WelcomePage');
  }

  itemclick(item,type)
  {
    this.navCtrl.push('ChapterlistPage',{'item':item,'type':type});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardStudentPage');
    this.getSubject();
  }

  getSubject() {
    this.loader.Show("Loading...");
    this.api.postWithoutEmp('/api/get_subjects',{
      'classid': this.user.classid,
      'subject_type': '1'
    }).subscribe(res => {
      this.loader.Hide();
      console.log('this.get_subjects', res);
      if (res.authorization) {
        this.subject = res.data;
        this.getSkill();
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

  getSkill() {
    this.loader.Show("Loading...");
    this.api.postWithoutEmp('/api/get_subjects',{
      'classid': this.user.classid,
      'subject_type': '2'
    }).subscribe(res => {
      this.loader.Hide();
      console.log('this.get_subjects', res);
      if (res.authorization) {
        this.skills = res.data;
        this.getService();
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

  getService() {
    this.loader.Show("Loading...");
    this.api.postWithoutEmp('/api/get_services',{
      'user_type': this.user.user_type,
      'user_id': this.user.user_id
    }).subscribe(res => {
      this.loader.Hide();
      if (res.authorization) {
        var strarray = res.data.services;
        this.services = strarray.split(',');
        this.admin = {
          'user_name':res.data.name,
          'phone':res.data.phone
        }
        console.log('this.get_services', this.services);
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

}
