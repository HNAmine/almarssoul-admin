import { ProfilPage } from './../pages/profil/profil';
import { GooglePlus} from '@ionic-native/google-plus';
import { Authentification } from './../pages/authentification/authentification';
import { Home } from "./../pages/home/home";
import { Dashboard } from "./../pages/dashboard/dashboard";
import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { FormsModule } from "@angular/forms";
import { AuthentificationService } from '../providers/authentification.service';
import { ErrorsHandler } from './errors.handler';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { StoreService } from '../providers/store.service';
import { ProductService } from '../providers/product.service';
import { BasketService } from '../providers/basket.service';
import { SMS } from '@ionic-native/sms';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialSharing } from '@ionic-native/social-sharing';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { BasketDetailsPage } from '../pages/basket-details/basket-details';
import { CallNumber } from '@ionic-native/call-number';

@NgModule({
  declarations: [
    MyApp,
    Dashboard,
    Home,
    Authentification,
    ProfilPage,
    BasketDetailsPage
  ],
  imports: [BrowserModule, HttpClientModule,FormsModule,IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    Authentification,
    ProfilPage,
    Dashboard,
    BasketDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GooglePlus,
    AuthentificationService,
    StoreService,
    BasketService,
    SMS,
    Geolocation,
    ProductService,
    SocialSharing,
    LaunchNavigator,
    CallNumber,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }
  ]
})
export class AppModule {}
