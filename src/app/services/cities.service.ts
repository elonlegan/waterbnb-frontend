import { Injectable } from '@angular/core';
import * as countrycitystatejson from 'countrycitystatejson';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  countries = [];
  cities = [];

  private countryData = countrycitystatejson;

  getAll() {
    this.countries = this.countryData.getCountries();

    for (let country of this.countries) {
      let states = this.countryData.getStatesByShort(country.shortName);
      for (let state of states) {
        this.cities = [
          ...this.cities,
          ...this.countryData
            .getCities(country.shortName, state)
            .map((city) => {
              return {
                name: city,
                country: country,
              };
            }),
        ];
      }
    }
    return this.cities;
  }
}
