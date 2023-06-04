import { Component, OnInit } from '@angular/core';
import { AccountService } from '@app/services';
import { Account, Role } from '@app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  Role = Role;
  account: Account;
  responsiveMenu: boolean = true;

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe((res) => (this.account = res));
  }

  ngOnInit(): void {}

  logout() {
    this.accountService.logout();
  }

  toggleMenu() {
    this.responsiveMenu = !this.responsiveMenu;
  }
}
