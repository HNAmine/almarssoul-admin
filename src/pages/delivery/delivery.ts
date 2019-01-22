import { Component } from "@angular/core";
import { LoadingController, NavController, NavParams, ModalController } from "ionic-angular";
import { Action } from "../../model/product.model";
import { AuthentificationService } from "../../providers/authentification.service";
import { User } from "../../model/authentification.model";
import { DeliveryModal } from "./delivery-modal";

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-delivery",
  templateUrl: "delivery.html"
})
export class DeliveryPage {

  deliveries:User [] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private authentificationService: AuthentificationService
  ) {
  }

  ionViewDidLoad() {
    this.loadDelivery();
  }

  addDelivery() {
    let deliveryModal = this.modalCtrl.create(DeliveryModal, { mode: Action.ADD });
    deliveryModal.present();
    deliveryModal.onDidDismiss(data => {
      if(data && data.delivery && data.mode === Action.ADD){
        this.deliveries.push(data.delivery);
      }
    });
  }

  updateDelivery(delivery: User){
    let productModal = this.modalCtrl.create(DeliveryModal, { mode: Action.UPDATE , delivery });
    productModal.present();
    productModal.onDidDismiss(data => {
      if(data && data.delivery && data.mode === Action.UPDATE){
        for(let i = 0; i< this.deliveries.length;i++){
          if(this.deliveries[i].id === data.delivery.id){
            this.deliveries[i] = data.delivery;
            break;
          }
        }
      }
    });
  }

  loadDelivery() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.deliveries = [];
    this.authentificationService.getAllDeliveryList().subscribe(deliveries =>  {
      this.deliveries = deliveries;
      loader.dismiss();
    }, (err) => {
      loader.dismiss();
      throw err;
    });
  }

}
