import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { ApiProvider } from '../../providers/api/api';
import { LoaderServiceProvider } from '../../providers/loader-service/loader-service';

@IonicPage()
@Component({
  selector: 'page-dashboard-agent',
  templateUrl: 'dashboard-agent.html',
})
export class DashboardAgentPage {
  name:any;
  segment = "add";
  studentlist = "approved";
  Classes = [];
  medium: any;
  mediums = [];
  class: any;
  board: any;
  boards=[];
  gender: any;
  register: any;
  active = [];
  reject = [];
  pending = [];
  user:any;
  constructor(public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public api: ApiProvider,
    private loader: LoaderServiceProvider,
    public navPeram: NavParams,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController, public navParams: NavParams) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.register = this.formBuilder.group({
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      schoolname: ["", Validators.required],
      city: ["", Validators.required],
      address: ["", Validators.required],
      imei: ["", Validators.required],
      email:["", Validators.required],
      mobile: ["", Validators.required],
      password: ["", Validators.required],
      confirmpassword: ["", Validators.required]
    });

  }

  selectedValue(item) {
    console.log('ionViewDidLoad selectedValue', item);
    this.board = item;
  }

  selectedValueGender(gender) {
    this.gender = gender;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardAgentPage');
    this.getBoard();
  }

  add() {
    console.log(this.register.value);
    if (!this.gender) {
      let toast = this.toastCtrl.create({
        message: 'Please select Gender',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    if (!this.board) {
      let toast = this.toastCtrl.create({
        message: 'Please select Board',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    if (!this.medium) {
      let toast = this.toastCtrl.create({
        message: 'Please select Medium',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }

    if (!this.class) {
      let toast = this.toastCtrl.create({
        message: 'Please select Class',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    if (this.register.value.confirmpassword != this.register.value.password) {
      let toast = this.toastCtrl.create({
        message: 'Password does not match',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }

    this.loader.Show("Loading...");
    this.api.postWithoutEmp('api/add_student', {
      "added_by":this.user.user_id,
      "status":"0",
      "email":this.register.value.email,
      "user_type":this.user.user_type,
      "first_name": this.register.value.firstname,
      "last_name": this.register.value.lastname,
      "phone": this.register.value.mobile,
      "school": this.register.value.schoolname,
      "imei": this.register.value.imei,
      "gender": this.gender, // 1 male ,2 female
      "boardid": this.board.boardid,  // 1 state ,2 cbse
      "mediumid": this.medium.id, // get id from get_medium api
      "classid": this.class.classid,
      "address":this.register.value.address,
      "city":this.register.value.city,
      "password": this.register.value.password
    }).subscribe(res => {
      console.log('api/add_student', res);
      this.loader.Hide();
      if (res.authorization) {
        let toast = this.toastCtrl.create({
          message:  res.massage,
          position: 'top',
          duration: 3000
        });
        toast.present();
        this.navCtrl.setRoot('DashboardAgentPage');
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

  onChangeBoard(item)
  {
     console.log(item.boardid);
     this.mediums =[];
     this.medium = null;
     this.getMedium(item.boardid);
  }
  getBoard() {
    this.loader.Show("Loading...");
    this.api.get('api/get_boards').subscribe(res => {
      this.loader.Hide();
      console.log('this.get_boards', res);
      if (res.authorization) {
        this.boards = res.data;
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

  
  onChangeMedium(item)
  {
     console.log(item.id);
     this.Classes =[];
     this.class = null;
     this.getClass(item.id);
  }

  getClass(mediumId) {
    this.loader.Show("Loading...");
    this.api.post('/api/get_classes',{
      "mediumid":mediumId
    }).subscribe(res => {
      this.loader.Hide();
      console.log('this.get_boards', res);
      if (res.authorization) {
        this.Classes = res.data;
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

  getMedium(boardId) {
    this.loader.Show("Loading...");
    this.api.post('/api/get_medium',{
      "boardid":boardId
    }).subscribe(res => {
      this.loader.Hide();
      console.log('this.get_medium', res);
      if (res.authorization) {
        this.mediums = res.data;
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

  segmentChanged(type) {
    console.log('this.get_students_list', type.value);
    if (type.value === 'list') {
      this.getStudentList('1');
    }
  }

  segmentChangedlist(type) {
    console.log('this.get_students_list', type.value);
    switch (type.value) {
      case 'approved':
        this.getStudentList('1');
        break;
      case 'pending':
        this.getStudentList('0');
        break;
      case 'rejected':
        this.getStudentList('2');
        break;
      default:
        break;
    }
  }

  getStudentList(id) {
    this.loader.Show("Loading...");
    this.api.postWithoutEmp('api/get_students', {
      "status": id,
      "user_type":this.user.user_type,
      "added_by":this.user.user_id
    }).subscribe(res => {
      this.loader.Hide();
      console.log('this.api/get_students', res);
      if (res.authorization) {
        switch (id) {
          case '0':
            this.pending = res.data;
            break;
          case '1':
            this.active = res.data;
            break;
          case '2':
            this.reject = res.data;
            break;
          default:
            break;
        }
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

  logout() {
    localStorage.clear();
    this.navCtrl.setRoot('WelcomePage');
  }
}
