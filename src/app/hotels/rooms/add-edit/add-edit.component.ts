import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import {
  RoomService,
  AlertService,
  HotelService,
  CitiesService,
} from '@app/services';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Hotel } from '@app/models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  form: UntypedFormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  loader = true;
  submitted = false;
  isValidImage: boolean = false;
  image: any;

  hotelId: string;
  hotel: Hotel;

  cities = [];
  roomTypes = [];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private roomService: RoomService,
    private alertService: AlertService,
    private http: HttpClient,
    private hotelService: HotelService
  ) {}

  ngOnInit() {
    this.hotelId = this.route.snapshot.params['hotelId'];

    this.hotelService
      .getById(this.hotelId)
      .pipe(first())
      .subscribe((hotel) => {
        this.hotel = hotel;
        this.loader = false;
      });

    this.roomService
      .getRoomTypes()
      .pipe(first())
      .subscribe((roomTypes) => {
        this.roomTypes = roomTypes;
      });

    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      type: ['', Validators.required],
      address: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
      imageUrl: ['', this.isAddMode ? '' : Validators.nullValidator],
    });

    if (!this.isAddMode) {
      this.loader = true;
      this.roomService
        .getById(this.id)
        .pipe(first())
        .subscribe((room) => {
          this.form.patchValue({
            ...room,
            imageUrl: '',
          });
          this.loader = false;
        });
    }
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
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
    if (this.isAddMode) {
      this.createRoom();
    } else {
      this.updateRoom();
    }
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileSize = file.size / 1024 / 1024;
      if (fileSize <= 5) {
        this.image = file;
        this.isValidImage = true;
      } else {
        this.isValidImage = false;
        alert('Too large image, max 5MB');
        this.form.controls['imageUrl'].setValue('');
        this.image = '';
      }
    }
  }

  private async createRoom() {
    try {
      await this.handleImageUpload();
      this.roomService
        .create({ ...this.form.value, hotel: this.hotel.id })
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success('Room created successfully', {
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

  private async updateRoom() {
    try {
      await this.handleImageUpload();
      this.roomService
        .update(this.id, this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success('Update successful', {
              keepAfterRouteChange: true,
            });
            this.router.navigate(['../../'], { relativeTo: this.route });
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

  async handleImageUpload() {
    if (this.image) {
      const data = new FormData();
      data.append('file', this.image);
      data.append('upload_preset', 'vikings');
      data.append('cloud_name', 'dev-empty');

      const response = await this.http
        .post<any>(environment.CLOUDINARY_URL, data)
        .toPromise();
      this.form.value.imageUrl = response.url;
    }
  }
}
