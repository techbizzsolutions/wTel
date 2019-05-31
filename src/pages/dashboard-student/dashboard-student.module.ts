import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardStudentPage } from './dashboard-student';

@NgModule({
  declarations: [
    DashboardStudentPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardStudentPage),
  ],
})
export class DashboardStudentPageModule {}
