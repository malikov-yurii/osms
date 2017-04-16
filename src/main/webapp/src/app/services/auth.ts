import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, CanActivate } from '@angular/router';
import { ApiService } from './index';

@Injectable()
export class AuthService implements CanActivate {
  constructor(
    private router: Router,
    private api: ApiService
  ) {}

  isAuthorized: boolean = false;

  canActivate(): boolean {
    const canActivate = this.isAuthorized;
    this.onCanActivate(canActivate);
    return canActivate;
  }

  onCanActivate(canActivate: boolean) {
    if (!canActivate) {
      this.router.navigate(['login']);
    }
  }

  login(token) {
    this.api.post('/spring_security_check', `username=${token.username}&password=${token.password}`)
      .subscribe(
        res => {this.isAuthorized = true; console.log(this.isAuthorized); return this.router.navigate(['orders']) },
        error => false
      );

  }
}
