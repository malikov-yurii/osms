import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';

import {StaticDATA} from '../models';

var sessionTimeout;
export const sessionTimeoutStream = new Subject();

@Injectable()
export class ApiService {

  private headersForm: Headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  });

  private headersJson: Headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });



  constructor(private http: Http) {}

  get(path: string): Observable<any> {
    return this.http.get(path, {headers: this.headersForm})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
      .do(this.updateSession);
  }

  post(path: string): Observable<any> {
    return this.http.post(path, {headers: this.headersForm})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
      .do(this.updateSession);
  }

  put(path: string, body: any, json: boolean = false): Observable<any> {
    let headers = json ? this.headersJson : this.headersForm;
    return this.http.put(path, body, {headers})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson)
      .do(this.updateSession);
  }

  apiDelete(path: string): Observable<any> {
    return this.http.delete(path, {headers: this.headersForm})
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .do(this.updateSession);
  }

  private getJson(resp: Response) {
    try {
      return resp.json();
    } catch (err) {
      return;
    }
  }

  private checkForError(resp: Response) {
    if (resp.url.indexOf('login') !== -1) {
      return window.location.pathname = '/login';
    }

    if (resp.status >= 200 && resp.status < 400) {
      return resp;
    } else {
      const error = new Error(resp.statusText);
      error['response'] = resp;
      console.error(error);
      throw error;
    }
  }

  private updateSession() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
      sessionTimeoutStream.next();
    }, StaticDATA.sessionTime);
  }

}
