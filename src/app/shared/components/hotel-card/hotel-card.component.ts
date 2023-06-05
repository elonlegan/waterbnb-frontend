import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Account, Hotel, Role } from '@app/models';
import { AccountService } from '@app/services';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCardComponent implements OnInit {
  Role = Role;
  @Input() hotel: Hotel;
  @Input() account: Account;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe((res) => (this.account = res));
  }

  ngOnInit(): void {}

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
