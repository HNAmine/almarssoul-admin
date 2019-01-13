import { Component } from "@angular/core";
import { LoadingController, NavController, NavParams, AlertController } from "ionic-angular";
import { BasketDetails } from "../../model/product.model";
import { LaunchNavigator, LaunchNavigatorOptions } from "@ionic-native/launch-navigator";
import { CallNumber } from "@ionic-native/call-number";

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-basket-details",
  templateUrl: "basket-details.html"
})
export class BasketDetailsPage {
  basket:BasketDetails = {closestPositions: []};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private launchNavigator: LaunchNavigator,
    private alertCtrl: AlertController,
    private callNumber: CallNumber
  ) {
    this.basket = navParams.get("data");
  }

  ionViewDidLoad() {

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

  confirmChangeState(){
    let alert = this.alertCtrl.create({
      title: 'Are you sure ?',
      subTitle: 'Are you sure to change the state ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  callOwner(phone: string){
    this.callNumber.callNumber(phone, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
}
