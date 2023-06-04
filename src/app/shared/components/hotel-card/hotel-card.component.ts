import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Account, Hotel, Role } from '@app/models';

@Component({
  selector: 'app-hotel-card',
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCardComponent implements OnInit {
  Role = Role;
  @Input() hotel: Hotel;
  @Input() account: Account;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onDelete(id: string) {
    this.delete.emit(id);
  }
}
