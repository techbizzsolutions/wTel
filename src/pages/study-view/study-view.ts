import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-study-view',
  templateUrl: 'study-view.html',
})
export class StudyViewPage {
  content = [];
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    private loader: LoaderServiceProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChapterlistPage',this.navParams.data);
    this.getSubject(this.navParams.data.id);
  }

  getSubject(id) {
    this.loader.Show("Loading...");
    this.api.postWithoutEmp('api/get_topic',{
      'id': id
    }).subscribe(res => {
      this.loader.Hide();
      console.log('this.get_topic', res);
      if (res.authorization) {
        this.content = res.data;
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
