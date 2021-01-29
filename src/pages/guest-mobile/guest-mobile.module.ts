import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GuestMobilePage } from './guest-mobile';

@NgModule({
  declarations: [
    GuestMobilePage,
  ],
  imports: [
    IonicPageModule.forChild(GuestMobilePage),
  ],
  exports: [
    GuestMobilePage
  ]
})
export class GuestMobilePageModule {}
