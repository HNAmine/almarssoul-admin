import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { dns, tokenPrefix } from '../app/config';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class BasketService {
  private dns = dns + 'baskets/';


  constructor(private _http: HttpClient, private authentificationService: AuthentificationService) {}

  /**
	 * --------------------------------------------------------------
	 *
	 * GET CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public getBasketToDelivery(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.authentificationService.token);
    return this._http.get(this.dns + 'basket-delivery', {
      headers
    });
  }

  /**
	 * --------------------------------------------------------------
	 *
	 * PUT CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public editState(basketId, state): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.authentificationService.token);
    return this._http.put(this.dns + basketId +'/state/' + state, null, {
      headers
    });
  }
}
