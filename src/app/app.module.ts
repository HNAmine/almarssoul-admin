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
import { StorePage } from '../pages/store/store';
import { CategoryPage } from '../pages/category/category';
import { StoreModal } from '../pages/store/store-modal';
import { CategoryService } from '../providers/category.service';
import { CategoryModal } from '../pages/category/category-modal';
import { ProductPage } from '../pages/product/product';
import { ProductModal } from '../pages/product/product-modal';
import { DeliveryPage } from '../pages/delivery/delivery';
import { DeliveryModal } from '../pages/delivery/delivery-modal';

@NgModule({
  declarations: [
    MyApp,
    Dashboard,
    Home,
    Authentification,
    ProfilPage,
    BasketDetailsPage,
    StorePage,
    CategoryPage,
    StoreModal,
    CategoryModal,
    ProductPage,
    ProductModal,
    DeliveryPage,
    DeliveryModal
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
    BasketDetailsPage,
    StorePage,
    CategoryPage,
    StoreModal,
    CategoryModal,
    ProductPage,
    ProductModal,
    DeliveryPage,
    DeliveryModal
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
    CategoryService,
    SocialSharing,
    LaunchNavigator,
    CallNumber,
    CategoryModal,
    {
      provide: ErrorHandler,
      useClass: ErrorsHandler
    }
  ]
})
export class AppModule {}
