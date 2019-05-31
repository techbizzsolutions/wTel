import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController, Events, IonicApp, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  showedAlert: boolean = false;
  confirmAlert: any;
  user:any;
  pages: Array<{
    title: string,
    component?: any,
    icon: any
  }>;
  constructor(public platform: Platform,
    public menuCtrl: MenuController,
    public alertCtrl: AlertController,
    private ionicApp: IonicApp,
    public events: Events,
    public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    events.subscribe('user:loggedIn', () => {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.menuCtrl.swipeEnable(true, 'menu1');
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.statusBar.backgroundColorByHexString("#8B0000");
      this.splashScreen.hide();
      this.user = JSON.parse(localStorage.getItem('user'));
      // used for an example of ngFor and navigation
        if (this.user) {
          this.menuCtrl.swipeEnable(false, 'menu1');
          if(this.user.user_type == "0")
          {
            this.pages = [
              {
                title: 'Dashboard',
                component: 'DashboardAgentPage',
                icon: 'ios-home'
              },
              {
                title: 'Log Out',
                icon: 'md-log-out'
              }];
            this.rootPage = 'AdvertisementPage';
          }
          else{
            this.pages = [
              {
                title: 'Dashboard',
                component: 'DashboardStudentPage',
                icon: 'ios-home'
              },
              {
                title: 'Log Out',
                icon: 'md-log-out'
              }];
            this.rootPage = 'AdvertisementPage';
          }
          
        } else {
          this.menuCtrl.swipeEnable(false, 'menu1');
          this.rootPage = 'AdvertisementPage';
        }
        this.platform.registerBackButtonAction(() => {
          const ionApp = <HTMLElement>document.getElementsByTagName("ion-app")[0];
          ionApp.style.display = "block";
          let activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive();
          this.menuCtrl.close();
  
          if (activePortal) {
            activePortal.dismiss();
            activePortal.onDidDismiss(() => {
            });
            //return;
          }
  
          if (this.ionicApp._modalPortal.getActive()) {
            this.ionicApp._modalPortal.getActive().dismiss();
            this.ionicApp._modalPortal.getActive().onDidDismiss(() => {
            });
            return;
          }
          if (this.nav.length() == 1) {
            if (!this.showedAlert) {
              this.confirmExitApp();
            } else {
              this.showedAlert = false;
              this.confirmAlert.dismiss();
            }
          }
          if (this.nav.canGoBack()) {
            this.nav.pop();
          }
  
        });
    });
  }

    // confirmation pop up to exit from app 
    confirmExitApp() {
      this.showedAlert = true;
      this.confirmAlert = this.alertCtrl.create({
        subTitle: "Do you want to exit from the app?",
        buttons: [
          {
            text: 'NO',
            handler: () => {
              this.showedAlert = false;
              return;
            }
          },
          {
            text: 'YES',
            handler: () => {
              this.platform.exitApp();
            }
          }
        ]
      });
      this.confirmAlert.present();
    }

  openPage(page) {
    console.log("*****",page);
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
      switch(page.title)
      {
        case 'Dashboard':
        this.nav.setRoot(page.component);
        break;
        case 'Log Out':
        localStorage.clear();
        this.menuCtrl.swipeEnable(false, 'menu1');
        this.nav.setRoot(LoginPage);
        break;
        default:
        {
          this.nav.push(page.component);
        }
      }
  }

}
