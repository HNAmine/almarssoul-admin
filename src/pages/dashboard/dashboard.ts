import { Component } from "@angular/core";
import { LoadingController, NavController, NavParams } from "ionic-angular";

import { BasketService } from "../../providers/basket.service";
import { BasketDetails } from "../../model/product.model";
import { LaunchNavigator, LaunchNavigatorOptions } from "@ionic-native/launch-navigator";
import { BasketDetailsPage } from "../basket-details/basket-details";
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-dashboard",
  templateUrl: "dashboard.html"
})
export class Dashboard {
  token = null;
  baskets:BasketDetails[] = [];
  loading = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private basketService:BasketService,
    private launchNavigator: LaunchNavigator,
    private callNumber: CallNumber
  ) {
  }

  ionViewDidLoad() {
      this.loadBasketToDelivery();
  }

  loadBasketToDelivery(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.loading = true;
    this.basketService.getBasketToDelivery().subscribe(baskets => {
      this.baskets = baskets;
      loader.dismiss();
      this.loading = false;
    }, () => {
        loader.dismiss();
        this.loading = false;
    });
  }

  showInMap(basket: BasketDetails){
    let options: LaunchNavigatorOptions = {
      // app: LaunchNavigator.APPS.USER_SELECT
  };

  this.launchNavigator.navigate([basket.lat, basket.lng], options)
  .then(
      success => console.log('Launched navigator'),
      error => console.log('Error launching navigator', error)
  );
  }

  goToBasketDetail(basket: BasketDetails){
    this.navCtrl.push(BasketDetailsPage, {
      data: basket
    });
  }

  callOwner(phone: string){
    this.callNumber.callNumber(phone, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
