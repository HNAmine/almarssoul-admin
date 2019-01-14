import { NavParams, ViewController, LoadingController, ToastController, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { Action } from "../../model/product.model";
import { Category } from "../../model/category.model";
import { CategoryService } from "../../providers/category.service";

@Component({
    selector: 'category-modal',
    templateUrl: "category-modal.html"
  })
  export class CategoryModal {
  
   mode = "ADD";
  
   category: Category = {};

   constructor( navParams: NavParams, public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,     public navCtrl: NavController,
    private categoryService: CategoryService) {
      this.mode = navParams.get("mode");
      if(this.mode === Action.UPDATE){
          this.category = navParams.get("category");
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
      // this.storeService.addStore(this.category).subscribe(store => {
      //   loader.dismiss();
      //   const toast = this.toastCtrl.create({
      //     message: 'Store was added successfully',
      //     duration: 3000
      //   });
      //   toast.present();
      //   this.viewCtrl.dismiss({store, mode: this.mode});
      // }, (err)=> {
      //   this.viewCtrl.dismiss();
      //   throw err;
      // });
    }

    if(this.mode === Action.UPDATE){
      // this.storeService.updateStore(this.store).subscribe(store => {
      //   loader.dismiss();
      //   const toast = this.toastCtrl.create({
      //     message: 'Store was updated successfully',
      //     duration: 3000
      //   });
      //   toast.present();
      //   this.viewCtrl.dismiss({store, mode: this.mode});
      // }, (err)=> {
      //   this.viewCtrl.dismiss();
      //   throw err;
      // });
    }
  }

}
