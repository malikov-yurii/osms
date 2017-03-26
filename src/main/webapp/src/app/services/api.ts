import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiService {
  headers:Headers = new Headers({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  });

  url:string = 'ajax/profile/';

  constructor(private http:Http) {

  }

  private getJson(resp:Response) {
    return resp.json();
  }

  private checkForError(resp:Response) {
    if (resp.status >= 200 && resp.status < 300) {
      return resp;
    } else {
      const error = new Error(resp.statusText);
      error['response'] = resp;
      console.error(error);
      throw error;
    }
  }

  get(path:string):Observable<any> {
    return this.http.get(`${this.url}${path}`, this.headers)
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  post(path: string, body): Observable<any> {
    return this.http.post(
        `${this.url}${path}`,
        JSON.stringify(body),
        {headers: this.headers}
      )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  delete(path:string):Observable<any> {
    return this.http.delete(`${this.url}${path}`, this.headers)
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

};