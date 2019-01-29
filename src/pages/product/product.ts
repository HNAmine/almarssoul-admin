import { Component } from "@angular/core";
import { LoadingController, NavController, NavParams, ModalController } from "ionic-angular";
import { Action, Product } from "../../model/product.model";
import { ProductService } from "../../providers/product.service";
import { ProductModal } from "./product-modal";

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-product",
  templateUrl: "product.html"
})
export class ProductPage {

  products:Product [] = [];
  search = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    private productService: ProductService
  ) {
  }

  ionViewDidLoad() {
    this.loadProducts();
  }

  addProduct() {
    let productModal = this.modalCtrl.create(ProductModal, { mode: Action.ADD });
    productModal.present();
    productModal.onDidDismiss(data => {
      if(data && data.product && data.mode === Action.ADD){
        this.products.push(data.product);
      }
    });
  }

  updateProduct(product: Product){
    let productModal = this.modalCtrl.create(ProductModal, { mode: Action.UPDATE , product });
    productModal.present();
    productModal.onDidDismiss(data => {
      if(data && data.product && data.mode === Action.UPDATE){
        for(let i = 0; i< this.products.length;i++){
          if(this.products[i].id === data.product.id){
            this.products[i] = data.product;
            break;
          }
        }
      }
    });
  }

  loadProducts() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.products = [];
    this.productService.getProducts(this.search).subscribe(products =>  {
      this.products = products;
      loader.dismiss();
    }, (err) => {
      loader.dismiss();
      throw err;
    });
  }

  onInput($event){
    this.products = [];
    this.loadProducts();
  }

  onCancel($event){
    this.products = [];
    this.search = '';
    this.loadProducts();
  }

}
