import { Injectable } from '@angular/core';
import { dns, tokenPrefix } from '../app/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthentificationService } from './authentification.service';
import { Product } from '../model/product.model';


@Injectable()
export class ProductService {
  private dns = dns + 'products/';

  constructor(private _http: HttpClient, private authentificationService: AuthentificationService) {}

  /**
	 * --------------------------------------------------------------
	 *
	 * GET CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  
  public getProducts(search): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.authentificationService.token);
    return this._http.get(this.dns + 'list?search='+search, {
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
  public updateProduct(product: Product): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.authentificationService.token);
    return this._http.put(this.dns, product, {headers});
  }

  /**
	 * --------------------------------------------------------------
	 *
	 * POST CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public addProduct(product: Product): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.authentificationService.token);
    return this._http.post(this.dns, product, {headers});
  }
}
