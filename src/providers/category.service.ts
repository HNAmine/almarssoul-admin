import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tokenPrefix, dns } from '../app/config';
import { Store } from '../model/store.model';
import { AuthentificationService } from './authentification.service';

@Injectable()
export class CategoryService {
  private dns = dns + 'categories/';

  constructor(private _http: HttpClient, private authentificationService: AuthentificationService) {}

  /**
	 * --------------------------------------------------------------
	 *
	 * GET CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public addCategory(store: Store): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.authentificationService.token);
    return this._http.post(this.dns, store, {headers});
  }
  /**
	 * --------------------------------------------------------------
	 *
	 * PUT CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public updateCategory(store: Store): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.authentificationService.token);
    return this._http.put(this.dns, store, {headers});
  }
  /**
	 * --------------------------------------------------------------
	 *
	 * POST CALLS
	 *
	 * --------------------------------------------------------------
	 **/
  public getCategories(search): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    headers = headers.append('Authorization', tokenPrefix + this.authentificationService.token);
    return this._http.get(this.dns + 'list?search='+search, {
      headers
    });
  }

}
