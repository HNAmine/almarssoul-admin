import { NavParams, ViewController, LoadingController, ToastController, NavController } from "ionic-angular";
import { Component } from "@angular/core";
import { Action, Product } from "../../model/product.model";
import { CategoryService } from "../../providers/category.service";
import { ProductService } from "../../providers/product.service";

@Component({
    selector: 'product-modal',
    templateUrl: "product-modal.html"
  })
  export class ProductModal {
  
   mode = "ADD";
  
   product: Product = {};

   categories: {id :number, label: string}[] = [];
  
   constructor( navParams: NavParams, public viewCtrl: ViewController,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public navCtrl: NavController,
    private categoryService: CategoryService, private productService: ProductService) {
      this.mode = navParams.get("mode");
      if(this.mode === Action.UPDATE) {
          this.product = {...navParams.get("product")};
      }
      this.loadCategories();
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
      this.productService.addProduct(this.product).subscribe(product => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Product was added successfully',
          duration: 3000
        });
        toast.present();
        this.viewCtrl.dismiss({product, mode: this.mode});
      }, (err)=> {
        this.viewCtrl.dismiss();
        loader.dismiss();
        throw err;
      });
    }

    if(this.mode === Action.UPDATE){
      this.productService.updateProduct(this.product).subscribe(product => {
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Product was updated successfully',
          duration: 3000
        });
        toast.present();
        this.viewCtrl.dismiss({product, mode: this.mode});
      }, (err)=> {
        loader.dismiss();
        this.viewCtrl.dismiss();
        throw err;
      });
    }
  }

  loadCategories(){
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.categories = [];
    this.categoryService.getCategoryOptions().subscribe(categories => {
      this.categories = categories;
      loader.dismiss();
    }, (err) => {
      loader.dismiss();
    })
  }

}
