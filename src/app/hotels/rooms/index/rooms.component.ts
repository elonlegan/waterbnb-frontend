import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, RoomService } from '@app/services';
import { Account, Role, Room } from '@app/models';

@Component({ templateUrl: 'rooms.component.html' })
export class RoomsComponent implements OnInit {
  Role = Role;
  rooms: Room[];
  account: Account;

  constructor(
    private roomService: RoomService,
    private accountService: AccountService
  ) {
    this.accountService.account.subscribe((res) => (this.account = res));
  }

  ngOnInit() {
    this.roomService
      .getAll()
      .pipe(first())
      .subscribe((rooms) => (this.rooms = rooms));
  }

  deleteRoom(id: string) {
    const room = this.rooms.find((x) => x.id === id);
    room.isDeleting = true;
    this.roomService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.rooms = this.rooms.filter((x) => x.id !== id);
      });
  }
}
