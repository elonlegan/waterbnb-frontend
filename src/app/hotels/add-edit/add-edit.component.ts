﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { HotelService, AlertService } from '@app/services';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Room } from '@app/models';

@Component({ templateUrl: 'add-edit.component.html' })
export class AddEditComponent implements OnInit {
  form: UntypedFormGroup;
  id: string;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  isValidImage: boolean = false;
  image: any;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private alertService: AlertService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      imageUrl: ['', this.isAddMode ? '' : Validators.nullValidator],
    });

    if (!this.isAddMode) {
      this.hotelService
        .getById(this.id)
        .pipe(first())
        .subscribe((hotel) => {
          this.form.patchValue({
            ...hotel,
            imageUrl: '',
          });
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
      this.createHotel();
    } else {
      this.updateHotel();
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
        // this.form.value.imageUrl = '';
        this.form.controls['imageUrl'].setValue('');
        this.image = '';
      }
    }
  }

  private async createHotel() {
    try {
      await this.handleImageUpload();
      this.hotelService
        .create(this.form.value)
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success('Hotel created successfully', {
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

  private async updateHotel() {
    try {
      await this.handleImageUpload();
      this.hotelService
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
