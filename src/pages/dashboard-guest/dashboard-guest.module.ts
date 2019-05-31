import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardGuestPage } from './dashboard-guest';

@NgModule({
  declarations: [
    DashboardGuestPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardGuestPage),
  ],
})
export class DashboardGuestPageModule {}
