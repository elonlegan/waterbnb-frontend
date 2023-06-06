import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  RoomService,
  AlertService,
  HotelService,
  CitiesService,
} from '@app/services';

interface Country {
  shortName: string;
  name: string;
}
@Component({
  selector: 'app-city-input',
  templateUrl: './city-input.component.html',
  styleUrls: ['./city-input.component.scss'],
})
export class CityInputComponent {
  @Input() submitted = false;
  @Input() formGroup: FormGroup;
  @Input() formControls: FormControl;
  @Input() formControlName;

  countries: Country[];
  states: string[];
  cities: string[];

  constructor(private citiesService: CitiesService) {
    this.countries = this.citiesService.getCountries();
  }

  ngOnInit() {
    console.log();

    if (
      this.formControls['country'].value &&
      this.formControls['state'].value &&
      this.formControls['state'].value
    ) {
      this.states = this.citiesService.getStatesByCountry(
        this.formControls['country'].value
      );
      this.formControls['state'].enable();

      this.cities = this.citiesService.getCitiesByState(
        this.formControls['country'].value,
        this.formControls['state'].value
      );
      if (!this.cities.length) {
        this.cities = [this.formControls['state'].value];
      }
      this.formControls['city'].enable();
    } else {
      this.formControls['state'].disable();
      this.formControls['city'].disable();
    }

    this.formControls['country'].valueChanges.subscribe((country) => {
      this.formControls['state'].reset();
      this.formControls['state'].disable();

      if (country) {
        this.states = this.citiesService.getStatesByCountry(country);
        this.formControls['state'].enable();
      }
    });

    this.formControls['state'].valueChanges.subscribe((state) => {
      console.log(state);

      this.formControls['city'].reset();
      this.formControls['city'].disable();

      if (state) {
        this.cities = this.citiesService.getCitiesByState(
          this.formControls['country'].value,
          state
        );

        if (!this.cities.length) {
          this.cities = [state];
        }
        this.formControls['city'].enable();
      }
    });
  }
}
