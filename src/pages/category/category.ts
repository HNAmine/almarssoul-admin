import { Component } from "@angular/core";
import { LoadingController, NavController, NavParams, ModalController } from "ionic-angular";
import { Category } from "../../model/category.model";
import { CategoryService } from "../../providers/category.service";
import { CategoryModal } from "./category-modal";
import { Action } from "../../model/product.model";

/**
 * Generated class for the Dashboard page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: "page-category",
  templateUrl: "category.html"
})
export class CategoryPage {

  categories:Category [] = [];
  search = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    private categoryService: CategoryService,
    public modalCtrl: ModalController
  ) {
  }

  ionViewDidLoad() {
    this.loadCategories();
  }

  addCategory() {
    let categoryModal = this.modalCtrl.create(CategoryModal, { mode: Action.ADD });
    categoryModal.present();
    categoryModal.onDidDismiss(data => {
      if(data.category && data.mode === Action.ADD){
        this.categories.push(data.category);
      }
    });
  }

  updateCategory(category: Category){
    let categoryModal = this.modalCtrl.create(CategoryModal, { mode: Action.UPDATE , category });
    categoryModal.present();
    categoryModal.onDidDismiss(data => {
      if(data.category && data.mode === Action.UPDATE){
        for(let i = 0; i< this.categories.length;i++){
          if(this.categories[i].id === data.category.id){
            this.categories[i] = data.category;
            break;
          }
        }
      }
    });
  }

  loadCategories() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.categories = [];
    this.categoryService.getCategories(this.search).subscribe(stores =>  {
      this.categories = stores;
      loader.dismiss();
    }, (err) => {
      loader.dismiss();
      throw err;
    });
  }

  onInput($event){
    this.categories = [];
    this.loadCategories();
  }

  onCancel($event){
    this.categories = [];
    this.search = '';
    this.loadCategories();
  }

}
