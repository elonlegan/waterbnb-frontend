import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Booking } from '@app/models';

const baseUrl = `${environment.apiUrl}/booking`;

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Booking[]>(baseUrl);
  }

  getByHotel(hotelId: string) {
    return this.http.get<Booking[]>(`${baseUrl}/hotel/${hotelId}`);
  }

  getById(id: string) {
    return this.http.get<Booking>(`${baseUrl}/${id}`);
  }

  searchBooking(params) {
    return this.http.get<Booking[]>(`${baseUrl}/search`, { params });
  }

  getBookingTypes() {
    return this.http.get<any[]>(`${baseUrl}/room-types`);
  }

  create(params) {
    return this.http.post(baseUrl, params);
  }

  update(id, params) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
