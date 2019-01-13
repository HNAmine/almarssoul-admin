import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { dns, tokenPrefix } from '../app/config';

@Injectable()
export class BasketService {
  private dns = dns + 'baskets/';


  constructor(private _http: HttpClient) {}

  /**
	 * --------------------------------------------------------------
	 *
	 * GET CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public getBasketToDelivery(tokenHash): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + tokenHash);
    return this._http.get(this.dns + 'basket-delivery', {
      headers
    });
  }

}
