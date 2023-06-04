import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HotelCardComponent,
    RoomCardComponent,
    TruncatePipe,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    HotelCardComponent,
    RoomCardComponent,
    TruncatePipe,
  ],
})
export class SharedModule {}
