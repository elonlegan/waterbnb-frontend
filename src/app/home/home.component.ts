import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Hotel } from '@app/models';

import { AccountService } from '@app/services';
import { HotelService } from '@app/services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  account = this.accountService.accountValue;

  hotels: Hotel[];
  allHotels: Hotel[];
  hotelSearch: string;

  constructor(
    private accountService: AccountService,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.hotelService
      .getAll()
      .pipe(first())
      .subscribe((hotels) => {
        this.allHotels = hotels;
        this.hotels = hotels;
      });
  }

  setHotels() {
    console.log(this.hotelSearch);

    this.hotels = this.allHotels.filter((hotel) =>
      hotel.title.includes(this.hotelSearch)
    );
  }
}
