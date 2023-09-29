import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, retry, timeout } from 'rxjs';
import { environment } from 'src/enviroments/enviroment';
import { Artist } from '../models/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }

  public apiURL = environment.apiURL + '/artist'

  public getAll(searchQuery?: string, pageNumber?: number, pageSize?: number, sortColumn?: string, sortOrder?: string): Observable<any> {
    let params = new HttpParams();
    if (pageNumber) { params = params.set("PageNumber", pageNumber) }
    if (pageSize) { params = params.set("PageSize", pageSize) }
    if (sortColumn) { params = params.set("SortColumn", sortColumn) }
    if (sortOrder) { params = params.set("SortOrder", sortOrder) }
    if (searchQuery) { params = params.set("searchQuery", searchQuery) }

    return this.http.get<any>(this.apiURL, { observe: 'response', params }).pipe(
      retry(3),
      timeout(15000),
      catchError(error => of([]))
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
