import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Room } from '@app/models';

const baseUrl = `${environment.apiUrl}/rooms`;

@Injectable({ providedIn: 'root' })
export class RoomService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Room[]>(baseUrl);
  }

  getByHotel(hotelId: string) {
    return this.http.get<Room[]>(`${baseUrl}/hotel/${hotelId}`);
  }

  getById(id: string) {
    return this.http.get<Room>(`${baseUrl}/${id}`);
  }

  getRoomTypes() {
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
