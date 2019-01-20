import { NavParams, ViewController, LoadingController, ToastController, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { Action } from "../../model/product.model";
import { User } from "../../model/authentification.model";
import { AuthentificationService } from "../../providers/authentification.service";

@Component({
    selector: 'delivery-modal',
    templateUrl: "delivery-modal.html"
  })
  export class DeliveryModal {
  
   mode = "ADD";
  
   delivery: User = {};
  
   constructor( navParams: NavParams, public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public navCtrl: NavController,
    private authentificationService: AuthentificationService) {
      this.mode = navParams.get("mode");
      if(this.mode === Action.UPDATE) {
          this.delivery = navParams.get("delivery");
      }
   }
  
   dismiss() {
    this.viewCtrl.dismiss({loadData: false});
  }

  submit() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    if(this.mode === Action.ADD) {
      this.authentificationService.addDelivery(this.delivery).subscribe(delivery => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Delivery was added successfully',
          duration: 3000
        });
        toast.present();
        this.viewCtrl.dismiss({delivery, mode: this.mode});
      }, (err)=> {
        loader.dismiss();
        // this.viewCtrl.dismiss();
        throw err;
      });
    }
  }

}
