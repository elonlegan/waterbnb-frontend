import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Account, Role, Room } from '@app/models';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
  Role = Role;
  @Input() room: Room;
  @Input() account: Account;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
