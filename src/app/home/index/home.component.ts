﻿import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { Hotel, Room } from '@app/models';

import { AccountService, AlertService, RoomService } from '@app/services';
import { HotelService } from '@app/services';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  form: UntypedFormGroup;
  submitted = false;
  loading = false;
  today: Date = new Date();

  account = this.accountService.accountValue;

  rooms: Room[];

  params: Params;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private accountService: AccountService,
    private hotelService: HotelService,
    private roomService: RoomService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });
    this.form = this.formBuilder.group({
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      arrivalDate: ['', Validators.required],
      departureDate: ['', Validators.required],
      hostNumber: ['', [Validators.required, Validators.min(1)]],
    });
    this.form.patchValue(this.params);
    this.onSubmit();

    this.form.valueChanges.subscribe((value) => {
      console.log(value);
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: value,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
    });
  }

  ngOnInit() {
    this.today = new Date();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    try {
      this.roomService
        .searchBooking(this.form.value)
        .pipe(first())
        .subscribe((rooms) => {
          this.rooms = rooms;
          this.loading = false;
        });
    } catch (error) {
      this.alertService.error(error);
      this.loading = false;
    }
  }
}
