import { NavParams, ViewController, LoadingController  } from "ionic-angular";
import { Component } from "@angular/core";
import { PointInterest } from "../../model/product.model";

@Component({
    selector: 'poi-modal',
    templateUrl: "poi-modal.html"
  })
  export class PoiModal {

    closestPosition: PointInterest = {};

   constructor( navParams: NavParams, public viewCtrl: ViewController,
    public loadingCtrl: LoadingController) {
      this.closestPosition = navParams.get("closestPosition");
   }

   dismiss() {
    this.viewCtrl.dismiss({loadData: false});
  }

}
