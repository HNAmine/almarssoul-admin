import { ProfilPage } from './../profil/profil';
import { Authentification } from './../authentification/authentification';

import { Component, ViewChild } from "@angular/core";
import { Platform, MenuController, Nav, NavController } from "ionic-angular";
import { Dashboard } from "../dashboard/dashboard";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { Storage } from '@ionic/storage';
import { tokenIndex } from '../../app/config';
import { AuthentificationService } from '../../providers/authentification.service';
import { User } from '../../model/authentification.model';
import { StorePage } from '../store/store';
import { CategoryPage } from '../category/category';
import { ProductPage } from '../product/product';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class Home {
  @ViewChild(Nav) nav: Nav;

  rootPage = Dashboard;

  pages: Array<{ title: string; icon: string; component: any }>;

  currentUser: User = null;

  trigram = null;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public navCtrl: NavController,
    private storage: Storage,
    private authentificationService: AuthentificationService
  ) {
    this.initializeApp();
    // set our app's pages

    this.pages = [
      { title: "Home", icon: "home", component: Dashboard }
    ];

    if(this.authentificationService.adminConnected) {
       this.pages.push( { title: "Store", icon: "archive", component: StorePage },
       { title: "Category", icon: "md-cube", component: CategoryPage },
       { title: "Product", icon: "md-albums", component: ProductPage },
       { title: "Profile", icon: "md-person", component: ProfilPage });
    }

  }

  ionViewDidLoad() {
    this.storage.get(tokenIndex).then((token) => {
      this.currentUser = this.authentificationService.getCurrentUser(token);
      this.getTrigram(this.currentUser.firstName, this.currentUser.lastName);
    });

    this.authentificationService.activeUser.subscribe((_user)=>{
      this.currentUser = _user;
      this.getTrigram(this.currentUser.firstName, this.currentUser.lastName);
    })
  }

  getTrigram(firstName, lastName) {
    this.trigram = firstName ? firstName.charAt(0) : null;
    if(lastName){
      this.trigram += lastName.charAt(0);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    // this.nav.setRoot(page.component);
    this.nav.insert(0,page.component);
    this.nav.popToRoot();
  }

  logout(){
    this.navCtrl.setRoot(Authentification);
  }

}
