import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BillPreviewPage } from './bill-preview';

@NgModule({
  declarations: [
    BillPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(BillPreviewPage),
  ],
  exports: [
    BillPreviewPage
  ]
})
export class BillPreviewPageModule {}
