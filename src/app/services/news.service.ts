import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getArticles(endpoint: string, params: { [key: string]: string | number }): Observable<any> {
    const url = `${environment.apiUrl}${endpoint}`;
    let httpParams = new HttpParams().set('apiKey', environment.apiKey);
    Object.keys(params).forEach((key) => {
      httpParams = httpParams.set(key, params[key].toString());
    });
    return this.http.get(url, { params: httpParams });
  }
}
