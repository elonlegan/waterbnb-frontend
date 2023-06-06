import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Account, Hotel, Role } from '@app/models';
import { AccountService, AlertService, HotelService } from '@app/services';
import { first } from 'rxjs/operators';

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

  constructor(
    private accountService: AccountService,
    private hotelService: HotelService,
    private alertService: AlertService
  ) {
    this.accountService.account.subscribe((res) => (this.account = res));
  }

  ngOnInit(): void {}

  onDelete(id: string) {
    this.delete.emit(id);
  }

  onToggleAvailable(event) {
    try {
      this.hotelService
        .update(this.hotel.id, { available: event })
        .pipe(first())
        .subscribe({
          next: () => {
            this.alertService.success('Update successful', {
              keepAfterRouteChange: true,
            });
          },
          error: (error) => {
            this.alertService.error(error);
          },
        });
    } catch (error) {
      this.alertService.error(error);
    }
  }
}
