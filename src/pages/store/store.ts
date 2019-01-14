import { Component } from "@angular/core";
import { LoadingController, NavController, NavParams, ModalController } from "ionic-angular";
import { StoreService } from "../../providers/store.service";
import { Store } from "../../model/store.model";
import { StoreModal } from "./store-modal";
import { Action } from "../../model/product.model";


/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-store",
  templateUrl: "store.html"
})
export class StorePage {

  search = '';
  stores:Store[] = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private storeService: StoreService,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
      this.loadStores();
  }

  loadStores(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.stores = [];
    this.storeService.getStores(this.search).subscribe(stores =>  {
      this.stores = stores;
      loader.dismiss();
    }, (err) => {
      loader.dismiss();
      throw err;
    });
  }

  onInput($event){
    this.stores = [];
    this.loadStores();
  }

  onCancel($event){
    this.stores = [];
    this.search = '';
    this.loadStores();
  }

  addStore(){
    let storeModal = this.modalCtrl.create(StoreModal, { mode: Action.ADD });
    storeModal.present();
    storeModal.onDidDismiss(data => {
      if(data.store && data.mode === Action.ADD){
        this.stores.push(data.store);
      }
    });
  }

  updateStore(store: Store) {
    let storeModal = this.modalCtrl.create(StoreModal, { mode: Action.UPDATE, store });
    storeModal.present();
    storeModal.onDidDismiss(data => {
      if(data.store && data.mode === Action.UPDATE){
        for(let i = 0; i< this.stores.length;i++){
          if(this.stores[i].id === data.store.id){
            this.stores[i] = data.store;
            break;
          }
        }
      }
    });
  }
}
