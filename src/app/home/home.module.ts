import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './index/home.component';
import { SharedModule } from '@app/shared/shared.module';
import { BookComponent } from './book/book.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, BookComponent],
})
export class HomeModule {}
