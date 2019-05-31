import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-chapterlist',
  templateUrl: 'chapterlist.html',
})
export class ChapterlistPage {

  chapters=[];
  constructor(public navCtrl: NavController,
    public api: ApiProvider,
    private loader: LoaderServiceProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
     public navParams: NavParams) {
  }

  itemclick(item)
  {
    this.navCtrl.push('StudyViewPage',item);
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChapterlistPage',this.navParams.data);
    if(this.navParams.data.type == "2")
    {
      this.getSkills(this.navParams.data.item.subjectid);
    }
    else{
      this.getSubject(this.navParams.data.item.subjectid);
    }
  }

  getSkills(id) {
    this.loader.Show("Loading...");
    this.api.postWithoutEmp('api/get_topics',{
      'subjectid': id,
      'topic_type':'2'
    }).subscribe(res => {
      this.loader.Hide();
      console.log('this.get_topics', res);
      if (res.authorization) {
        this.chapters = res.data;
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


  getSubject(id) {
    this.loader.Show("Loading...");
    this.api.postWithoutEmp('api/get_topics',{
      'subjectid': id,
      'topic_type':'1'
    }).subscribe(res => {
      this.loader.Hide();
      console.log('this.get_topics', res);
      if (res.authorization) {
        this.chapters = res.data;
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
