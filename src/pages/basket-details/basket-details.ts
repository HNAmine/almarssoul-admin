import { Component } from "@angular/core";
import { LoadingController, NavController, NavParams, AlertController } from "ionic-angular";
import { BasketDetails } from "../../model/product.model";
import { LaunchNavigator, LaunchNavigatorOptions } from "@ionic-native/launch-navigator";
import { CallNumber } from "@ionic-native/call-number";
import { BasketService } from "../../providers/basket.service";
import { Dashboard } from "../dashboard/dashboard";
import { AuthentificationService } from "../../providers/authentification.service";

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
    private basketService:BasketService,
    private alertCtrl: AlertController,
    private callNumber: CallNumber,
    public authentificationService: AuthentificationService
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

  confirmChangeState(state){
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
            this.editState(state);
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

  editState(state){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.basketService.editState(this.basket.id, state).subscribe(()=> {
      loader.dismiss();
      if(state == 'INPROGRESS') {
        this.basket.state = state;
      } else {
        this.navCtrl.push(Dashboard);
      }
    }, ()=> {
      loader.dismiss();
    })
  }
}
