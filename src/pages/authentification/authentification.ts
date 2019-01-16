import { Component } from "@angular/core";
import { NavController, NavParams, ToastController, LoadingController } from "ionic-angular";
import { tokenIndex } from '../../app/config';
import { Storage } from '@ionic/storage';
import { Credentials } from '../../model/authentification.model';
import { AuthentificationService } from "../../providers/authentification.service";
import { Value } from "../../model/shared.model";
import { Home } from "../home/home";
import { CustomError } from "../../app/errors.handler";

@Component({
  selector: "page-authentification",
  templateUrl: "authentification.html"
})
export class Authentification {

  credential: Credentials = {login:null ,password:null};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private authentificationService: AuthentificationService
  ) {
    this.storage.remove(tokenIndex);
  }

  ionViewDidLoad() {
  }

  signin() {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });

    loader.present();
      this.authentificationService.signin(this.credential).subscribe((token:Value<string>) => {

        if(this.authentificationService.isAdmin(token.value) || this.authentificationService.isDelivery(token.value)) {

          this.authentificationService.token = token.value;
          this.authentificationService.adminConnected = false;
          if(this.authentificationService.isAdmin(token.value)){
            this.authentificationService.adminConnected = true;
          }
         // set a key/value
         this.storage.set(tokenIndex, token.value);
         loader.dismiss();
         this.homePage();
        } else {
          loader.dismiss();
          throw new Error('You are not authorised')
        }
      }, (err: { error: CustomError } )=> {
        loader.dismiss();
        throw err;
      });
  }

  homePage() {
    this.navCtrl.push(Home);
  }
}
