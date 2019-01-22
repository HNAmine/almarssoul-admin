import { NavParams, ViewController, LoadingController, ToastController, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { Store } from "../../model/store.model";
import { StoreService } from "../../providers/store.service";
import { Action } from "../../model/product.model";

@Component({
    selector: 'store-modal',
    templateUrl: "store-modal.html"
  })
  export class StoreModal {
  
   mode = "ADD";
   store: Store = {avatarUri :'https://cdn.icon-icons.com/icons2/567/PNG/512/store_icon-icons.com_54371.png'};
   token = null;

   constructor( navParams: NavParams, public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,     public navCtrl: NavController,
    private storeService: StoreService) {
      this.mode = navParams.get("mode");
      if(this.mode === Action.ADD){
          this.store.type = "DEFAULT";
      }
      if(this.mode === Action.UPDATE){
          this.store = {...navParams.get("store")};
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

    if(this.mode === Action.ADD){
      this.storeService.addStore(this.store).subscribe(store => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Store was added successfully',
          duration: 3000
        });
        toast.present();
        this.viewCtrl.dismiss({store, mode: this.mode});
      }, (err)=> {
        this.viewCtrl.dismiss();
        throw err;
      });
    }

    if(this.mode === Action.UPDATE){
      this.storeService.updateStore(this.store).subscribe(store => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Store was updated successfully',
          duration: 3000
        });
        toast.present();
        this.viewCtrl.dismiss({store, mode: this.mode});
      }, (err)=> {
        this.viewCtrl.dismiss();
        throw err;
      });
    }
  }

}
