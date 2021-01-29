import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TodayofferPage } from './todayoffer';
import { PipesModule } from "../../app/pipes.module";

@NgModule({
  declarations: [
    TodayofferPage,
  ],
  imports: [
    IonicPageModule.forChild(TodayofferPage),PipesModule
  ],
})
export class TodayofferPageModule {}
