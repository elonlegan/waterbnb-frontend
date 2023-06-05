import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HotelCardComponent } from './components/hotel-card/hotel-card.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { CitySearchFilterPipe } from './pipes/city-search-filter.pipe';
import { CityInputComponent } from './components/city-input/city-input.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HotelCardComponent,
    RoomCardComponent,
    TruncatePipe,
    CitySearchFilterPipe,
    CityInputComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    HotelCardComponent,
    RoomCardComponent,
    TruncatePipe,
    CityInputComponent,
    CitySearchFilterPipe,
    LoaderComponent,
  ],
})
export class SharedModule {}
