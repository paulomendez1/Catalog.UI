import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, retry, timeout } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  public apiURL = environment.apiURL + '/artist'

  public getAll(pageSize?: number, pageIndex?: number): Observable<any> {
    let params = new HttpParams()
    if (pageIndex && pageSize) {
      params.set('pageSize', pageSize)
      params.set('pageIndex', pageIndex)
    }
    return this.http.get<any>(this.apiURL, { observe: 'response', params }).pipe(
      retry(3),
      timeout(15000)
    );
  }

  public createItem(artist: Artist) {
    return this.http.post<any>(this.apiURL, artist, { observe: 'response' }).pipe(
      retry(3),
      timeout(15000),
      map(data => data.body as boolean),
    );
  }
}
