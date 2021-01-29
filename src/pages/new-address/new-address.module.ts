import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewAddressPage } from './new-address';
import { PipesModule } from "../../app/pipes.module";
@NgModule({
  declarations: [
    NewAddressPage,
  ],
  imports: [
    IonicPageModule.forChild(NewAddressPage),PipesModule
  ],
  exports: [NewAddressPage]
})
export class NewAddressPageModule {}




