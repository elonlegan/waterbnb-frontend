import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Account, Role, Room } from '@app/models';
import { AccountService, AlertService, RoomService } from '@app/services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
})
export class RoomCardComponent implements OnInit {
  Role = Role;
  @Input() room: Room;
  @Input() account: Account;
  @Input() params: any;
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(
    private accountService: AccountService,
    private roomService: RoomService,
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
      this.roomService
        .update(this.room.id, { available: event })
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
