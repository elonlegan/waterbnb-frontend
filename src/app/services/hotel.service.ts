import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Hotel } from '@app/models';

const baseUrl = `${environment.apiUrl}/hotels`;

@Injectable({ providedIn: 'root' })
export class HotelService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Hotel[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Hotel>(`${baseUrl}/${id}`);
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
