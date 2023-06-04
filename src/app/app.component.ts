﻿import { Component } from '@angular/core';

import { AccountService } from './services';
import { Account, Role } from './models';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
  Role = Role;
  account: Account;

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe((x) => (this.account = x));
  }
}
