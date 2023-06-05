import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  FormArray,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, RoomService, BookingService } from '@app/services';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Room } from '@app/models';

@Component({ templateUrl: 'book.component.html' })
export class BookComponent implements OnInit {
  form: UntypedFormGroup;
  roomId: string;
  room: Room;
  loading = false;
  submitted = false;
  params: Params;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private bookingService: BookingService,
    private alertService: AlertService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.params = params;
    });
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.params['roomId'];

    this.form = this.formBuilder.group({
      emergencyContacts: this.formBuilder.array([]),
      hosts: this.formBuilder.array([]),
    });

    this.addHost();
    this.addEmergencyContact();

    this.roomService
      .getById(this.roomId)
      .pipe(first())
      .subscribe((room) => {
        this.room = room;
      });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  hosts(): FormArray {
    return this.form.get('hosts') as FormArray;
  }

  newHost(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
    });
  }

  addHost() {
    this.hosts().push(this.newHost());
  }

  removeHost(i: number) {
    if (this.hosts().controls.length <= 1) {
      return;
    }
    this.hosts().removeAt(i);
  }

  emergencyContacts(): FormArray {
    return this.form.get('emergencyContacts') as FormArray;
  }

  newEmergencyContact(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  addEmergencyContact() {
    this.emergencyContacts().push(this.newEmergencyContact());
  }

  removeEmergencyContact(i: number) {
    if (this.emergencyContacts().controls.length <= 1) {
      return;
    }
    this.emergencyContacts().removeAt(i);
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.bookRoom();
  }

  private async bookRoom() {
    try {
      this.bookingService
        .create({ ...this.form.value, ...this.params, room: this.room.id })
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success('Room booked successfully', {
              keepAfterRouteChange: true,
            });
            this.router.navigate(['../'], { relativeTo: this.route });
          },
          error: (error) => {
            this.alertService.error(error);
            this.loading = false;
          },
        });
    } catch (error) {
      this.alertService.error(error);
      this.loading = false;
    }
  }
}
