import { Injectable }               from '@angular/core';
import { Headers, Http, Response }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';
import { Subject }                  from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';

import { STATIC_DATA }              from '../models/index';
import { ProgressBarService } from '../ui/progress-bar/progress-bar.service';

let sessionTimeout;
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

  private headersText: Headers = new Headers({
    'Content-Type': 'text/plain',
    'Accept': 'text/plain'
  });

  constructor(private http: Http, private progressBar: ProgressBarService) {}

  get(path: string, showProgressBar = true, isRespJson = true): Observable<any> {
    if (showProgressBar) {
      this.progressBar.show();
    }

    const requestText = this.http.get(path, {headers: this.headersText})
        .finally(() => this.onRequestEnd(showProgressBar))
        .map(resp => resp.text());

    const requestJson = this.http.get(path, {headers: this.headersForm})
        .finally(() => this.onRequestEnd(showProgressBar))
        .map(this.checkForError)
        .catch(err => Observable.throw(err))
        .map(this.getJson);

    return isRespJson ? requestJson : requestText;
  }

  post(path: string): Observable<any> {
    this.progressBar.show();

    return this.http.post(path, {headers: this.headersForm})
      .finally(() => this.onRequestEnd())
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  put(path: string, body: any): Observable<any> {
    this.progressBar.show();

    return this.http.put(path, body, {headers: this.headersJson})
      .finally(() => this.onRequestEnd())
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  apiDelete(path: string): Observable<any> {
    this.progressBar.show();


    return this.http.delete(path, {headers: this.headersForm})
      .finally(() => this.onRequestEnd())
      .map(this.checkForError)
      .catch(err => Observable.throw(err));
  }

  private onRequestEnd(hideProgressBar = true) {
    this.updateSession();
    if (hideProgressBar) {
      this.progressBar.hide();
    }
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
    sessionTimeout = setTimeout(() => sessionTimeoutStream.next(), STATIC_DATA.sessionTime);
  }
}
