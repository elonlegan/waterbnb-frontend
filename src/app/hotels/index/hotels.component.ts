import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService, HotelService } from '@app/services';
import { Account, Hotel, Role } from '@app/models';

@Component({ templateUrl: 'hotels.component.html' })
export class HotelsComponent implements OnInit {
  Role = Role;
  hotels: Hotel[];
  account: Account;

  constructor(
    private hotelService: HotelService,
    private accountService: AccountService
  ) {
    this.accountService.account.subscribe((res) => (this.account = res));
  }

  ngOnInit() {
    this.hotelService
      .getAll()
      .pipe(first())
      .subscribe((hotels) => (this.hotels = hotels));
  }

  deleteHotel(id: string) {
    const hotel = this.hotels.find((x) => x.id === id);
    hotel.isDeleting = true;
    this.hotelService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.hotels = this.hotels.filter((x) => x.id !== id);
      });
  }
}
