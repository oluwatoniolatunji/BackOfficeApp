import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {

  abstract baseUrl: string;
  abstract service: string;
  abstract method: string;

  constructor(@Inject(HttpClient) public httpClient: HttpClient) { }

  get(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  post(obj: any, httpHeaders?: HttpHeaders): Observable<any> {
    const url = `${this.baseUrl}/${this.service}/${this.method}`;
    return this.httpClient.post<any>(url, obj, { headers: httpHeaders });
  }

}
