import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/enviroments/enviroment';
import { Observable, map, retry, timeout } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  private DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Expose-Headers': '*'
  };

  private apiURL = environment.apiURL + '/items'

  public getAll(searchQuery: string, pageNumber: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set("PageNumber", pageNumber)
      .set("PageSize", pageSize)
    if (searchQuery) {
      params = params.set("searchQuery", searchQuery)
    }

    return this.http.get<any>(this.apiURL, { observe: 'response', params }).pipe(
      retry(3),
      timeout(15000)
    );
  }

  public createItem(item: Item) {
    return this.http.post<any>(this.apiURL, item, { observe: 'response' }).pipe(
      retry(3),
      timeout(15000),
      map(data => data.body as boolean),
    );
  }

  public deleteItem(guid: string): Observable<any> {
    return this.http.delete<any>(this.apiURL + `/${guid}`).pipe(
      retry(3),
      timeout(15000)
    );
  }
}
