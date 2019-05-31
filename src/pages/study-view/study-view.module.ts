import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudyViewPage } from './study-view';

@NgModule({
  declarations: [
    StudyViewPage,
  ],
  imports: [
    IonicPageModule.forChild(StudyViewPage),
  ],
})
export class StudyViewPageModule {}
