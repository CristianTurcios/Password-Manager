import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ISite } from '../interfaces/Site';

@Injectable({
  providedIn: 'root'
})
export class SitesService {
  onSiteCreatedOrEdited = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  get(): Observable<any> {
    const url = `${environment.api}/sites`;
    return this.http.get(url);
  }

  post(data: ISite): Observable<any> {
    const url = `${environment.api}/sites`;
    return this.http.post(url, data);
  }

  put(id: string, data: ISite): Observable<any> {
    const url = `${environment.api}/sites/${id}`;
    return this.http.put(url, data);
  }

  delete(id: string): Observable<any> {
    const url = `${environment.api}/sites/${id}`;
    return this.http.delete(url);
  }
}
