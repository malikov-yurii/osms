import {Injectable} from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class ApiService {
  headers: Headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json'
  });


  constructor(private http: Http) {}

  private getJson(resp: Response) {
    try {
      return resp.json();
    } catch (err) {
      return;
    }
  }

  private checkForError(resp: Response) {
    if (resp.status >= 200 && resp.status < 400) {
      return resp;
    } else {
      const error = new Error(resp.statusText);
      error['response'] = resp;
      console.error(error);
      throw error;
    }
  }

  get(path: string): Observable<any> {
    return this.http.get(path, this.headers)
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  post(path: string, body): Observable<any> {
    return this.http.post(
        path,
        body,
        {headers: this.headers}
      )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  put(path: string, body): Observable<any> {
    return this.http.put(
      path,
      body,
      {headers: this.headers}
    )
      .map(this.checkForError)
      .catch(err => Observable.throw(err))
      .map(this.getJson);
  }

  apiDelete(path: string): Observable<any> {
    return this.http.delete(path, this.headers)
      .map(this.checkForError)
      .catch(err => Observable.throw(err));
  }

}
