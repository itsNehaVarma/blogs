import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  /**
  * for using put method
  * @param url : url where request will be send
  * @param data : body part of post data
  * @param params : Query params
  */
 post(url: string, data?: any, params?: object) {
  const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
  return this.http.post(apiUrl, data);
}

/**
 * for using get method.
 * @param url : url where request
 * @param params
 */
get(url: string, params?: object) {
  const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
  return this.http.get(apiUrl);
}
getFileTemplate(url: string, params?: object) {
  const apiUrl = `${this.baseUrl}${url}${this.generateQueryString(params)}`;
  return this.http.get(apiUrl, {
    responseType: 'arraybuffer'
  });
}


/**
 * Helper Method that will generate the queryString.
 * @param params Object to be converted into URLSearchParam.
 */
generateQueryString(params?: object): string {
  let queryString = '';
  const httpParam = new URLSearchParams();
  Object.keys(params || {}).forEach(key => httpParam.set(key, params[key]));
  queryString = httpParam.toString() ? `?${httpParam.toString()}` : '';
  return queryString;
}
}
