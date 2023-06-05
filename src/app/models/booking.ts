import { Room } from './room';

export class Booking {
  id?: string;
  emergencyContacts: EmergencyContact[];
  hosts: Host[];
  arrivalDate: Date;
  departureDate: Date;
  room: Room;
}

class EmergencyContact {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

class Host {
  firstName: String;
  LastName: String;
  phoneNumber: String;
  birthDate: Date;
  gender: String;
  documentType: String;
  documentNumber: String;
  email: String;
  contactNumber: String;
}
