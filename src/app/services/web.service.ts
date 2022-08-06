import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http:HttpClient) { }

  getGroups(){
    return this.http.get("https://62edbc17c1ef25f3da7d856e.mockapi.io/groups");
  }

  getImageBySearch(text?: string, category?: string, page?: number): Observable<any>{
    let params = new HttpParams().set('key', '13119377-fc7e10c6305a7de49da6ecb25');

    if (text) {
      params = params.set('q', text);
    }

    if (category) {
      params = params.set('category', category);
    }

    if (page) {
      params = params.set('page', page.toString());
    }

    const apiURL = `https://pixabay.com/api/`;
    return this.http.get<any>(apiURL, { params });
  }
}
