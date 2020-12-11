import { Injectable, Inject } from '@angular/core';
import { DefaultResponse } from './default-response';
import { HttpService } from './http.services';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService {
  constructor(public _http: HttpService) {}

  
  post<T>(
    url: string,
    body,
    useDefaultHeader: boolean = true,
    useFormData: boolean = false,
    newHeaders: HttpHeaders = null
  ): Observable<DefaultResponse<T>> {
    return this._http.post<T>(url, body, useDefaultHeader, useFormData);//, newHeaders);
  }
 
  put<T>(url: string, body,
    useDefaultHeader: boolean = true,
    useFormData: boolean = false): Observable<DefaultResponse<T>> {
    return this._http.put<T>(url, body, useDefaultHeader, useFormData);
  }

  patch<T>(url: string, body): Observable<DefaultResponse<T>> {
    return this._http.patch<T>(url, body);
  }

  get<T>(url: string, id: number): Observable<DefaultResponse<T>> {
    return this._http.get<T>(`${url}/${id}`);
  }

  getAll<T>(url: string): Observable<DefaultResponse<T>> {
    return this._http.get<T>(`${url}`);
  }
  
  getAllImagem<T>(url: string): Observable<DefaultResponse<T>> {
    
    return this._http.get<T>(`${url}`);
  }
  
  delete<T>(url: string, id: number): Observable<DefaultResponse<T>> {
    return this._http.delete<T>(url, id);
  }
  
  delete2<T>(url: string): Observable<DefaultResponse<T>> {
    return this._http.delete2<T>(`${url}`);
  }

  getData(url: string): Observable<any> {
    return this._http.getData(url);
  }
  getP(url:string){
    return this._http.getData(url);
  }
 
  getFotosID(url:string){
    return this._http.getData(url);
  }
}
