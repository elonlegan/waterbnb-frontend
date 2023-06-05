import { Room } from './room';

export class Hotel {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rooms?: Room[];
  isDeleting?: boolean;
}
