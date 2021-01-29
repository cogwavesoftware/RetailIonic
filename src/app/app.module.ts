
import { NgModule, ErrorHandler } from "@angular/core";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
// import { AngularFireModule } from "@angular/fire";
import { MyApp } from "./app.component";
// import { AngularFireAuthModule } from "@angular/fire/auth";
// import { AngularFireDatabaseModule } from "@angular/fire/database";
import { firebaseConfig } from "./firebase.config";
import { CartService } from "../pages/cart.service";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { BrowserModule } from "@angular/platform-browser";

import { AuthService } from './../pages/auth-service';
import { FoodService } from './../pages/food-service';
import { DatePicker } from "@ionic-native/date-picker";
import { BillerService } from './../pages/biller-service';
import { GenericService } from './../pages/generic-service';
import { IonicStorageModule } from '@ionic/storage';

import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [MyApp],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    // AngularFireModule.initializeApp(firebaseConfig),
    // AngularFireAuthModule,
    // AngularFireDatabaseModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [BrowserModule],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    InAppBrowser,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    BillerService,
    CartService,
    FoodService,
    GenericService,
    DatePicker,
    
  ]
})
export class AppModule { }
