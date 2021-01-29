import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { HomePage } from "./home";
import { PipesModule } from "../../app/pipes.module";
import {DatePipe} from '@angular/common';
@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage), PipesModule],
  exports: [HomePage],
  providers:[DatePipe]
})
export class HomePageModule {}
