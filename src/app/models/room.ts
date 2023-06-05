﻿import { Hotel } from './hotel';

export class Room {
  id?: string;
  name: string;
  country: string;
  state: string;
  city: string;
  price: string;
  address: string;
  type: string;
  hotel: Hotel;
  imageUrl?: string;
  description?: string;
  isDeleting?: boolean;
}
