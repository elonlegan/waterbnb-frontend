import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Account, Role, Room } from '@app/models';
import { AccountService } from '@app/services';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
  Role = Role;
  @Input() room: Room;
  @Input() account: Account;
  @Input() params: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(private accountService: AccountService) {
    this.accountService.account.subscribe((res) => (this.account = res));
  }

  ngOnInit(): void {}

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
