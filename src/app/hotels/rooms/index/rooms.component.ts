import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, HotelService, RoomService } from '@app/services';
import { Account, Hotel, Role, Room } from '@app/models';
import { ActivatedRoute } from '@angular/router';

@Component({ templateUrl: 'rooms.component.html' })
export class RoomsComponent implements OnInit {
  Role = Role;
  rooms: Room[];
  account: Account;

  hotelId: string;
  hotel: Hotel;

  constructor(
    private roomService: RoomService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {
    this.accountService.account.subscribe((res) => (this.account = res));
  }

  ngOnInit() {
    this.hotelId = this.route.snapshot.params['hotelId'];

    this.hotelService
      .getById(this.hotelId)
      .pipe(first())
      .subscribe((hotel) => {
        this.hotel = hotel;
      });

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
