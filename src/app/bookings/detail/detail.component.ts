import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService, BookingService } from '@app/services';
import { MustMatch } from '@app/helpers';
import { Booking } from '@app/models';

@Component({ templateUrl: 'detail.component.html' })
export class DetailComponent implements OnInit {
  booking: Booking;
  bookingId: string;
  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.bookingId = this.route.snapshot.params['id'];

    this.bookingService
      .getById(this.bookingId)
      .pipe(first())
      .subscribe((booking) => (this.booking = booking));
  }
}
