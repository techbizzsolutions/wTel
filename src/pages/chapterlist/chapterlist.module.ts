import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChapterlistPage } from './chapterlist';

@NgModule({
  declarations: [
    ChapterlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ChapterlistPage),
  ],
})
export class ChapterlistPageModule {}
