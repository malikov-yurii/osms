import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/index';

@Component({
  template: `
    <form [formGroup]="loginForm" class="login-form" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="username">
      <input type="password" formControlName="password">
      
      <button type="submit">Login</button>
    </form>
  `
})

export class Login implements OnInit {
  private loginForm: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      "username": ['', Validators.required],
      "password": ['', Validators.required]
    })
  }

  onSubmit() {
    return this.authService.login(this.loginForm.value);
  }
}
