import { NavParams, ViewController, LoadingController, ToastController, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { Action } from "../../model/product.model";
import { Category } from "../../model/category.model";
import { CategoryService } from "../../providers/category.service";
import { StoreService } from "../../providers/store.service";

@Component({
    selector: 'category-modal',
    templateUrl: "category-modal.html"
  })
  export class CategoryModal {
  
   mode = "ADD";
  
   category: Category = {};

   stores: {id :number, label: string}[] = [];
  
   constructor( navParams: NavParams, public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public navCtrl: NavController,
    private categoryService: CategoryService, private storeService: StoreService) {
      this.mode = navParams.get("mode");
      if(this.mode === Action.UPDATE) {
          this.category = {...navParams.get("category")};
      }
      this.loadStores();
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
      this.categoryService.addCategory(this.category).subscribe(category => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Category was added successfully',
          duration: 3000
        });
        toast.present();
        this.viewCtrl.dismiss({category, mode: this.mode});
      }, (err)=> {
        this.viewCtrl.dismiss();
        throw err;
      });
    }

    if(this.mode === Action.UPDATE){
      this.categoryService.updateCategory(this.category).subscribe(category => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Category was updated successfully',
          duration: 3000
        });
        toast.present();
        this.viewCtrl.dismiss({category, mode: this.mode});
      }, (err)=> {
        this.viewCtrl.dismiss();
        throw err;
      });
    }
  }

  loadStores(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.stores = [];
    this.storeService.getStoreOptions().subscribe(stores => {
      this.stores = stores;
      loader.dismiss();
    }, (err) => {
      loader.dismiss();
    })
  }

}
