import { Room } from './room';

export class Hotel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  available: boolean;
  rooms?: Room[];
  isDeleting?: boolean;
}
