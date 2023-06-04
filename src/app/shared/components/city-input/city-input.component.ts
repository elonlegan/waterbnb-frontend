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
  cities = [];

  constructor(private citiesService: CitiesService) {
    this.cities = this.citiesService.getAll();
  }
}
