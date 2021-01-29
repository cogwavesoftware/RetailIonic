import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CheckoutPage } from "./checkout";
import { PipesModule } from "../../app/pipes.module";
import { DatePipe } from "@angular/common";

@NgModule({
  declarations: [CheckoutPage],
  imports: [IonicPageModule.forChild(CheckoutPage), PipesModule],
  exports: [CheckoutPage],
  providers:[DatePipe]
})
export class CheckoutPageModule { }
