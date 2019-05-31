import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardAgentPage } from './dashboard-agent';

@NgModule({
  declarations: [
    DashboardAgentPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardAgentPage),
  ],
})
export class DashboardAgentPageModule {}
