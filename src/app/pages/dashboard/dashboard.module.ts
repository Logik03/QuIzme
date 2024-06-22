import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from '../../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';
import { GameBoardComponent } from '../game-board/game-board.component';
import { AdvertComponent } from '../dashboard/advert/advert.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [OverviewComponent, SettingsComponent, GameBoardComponent, AdvertComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule, NgOtpInputModule, ReactiveFormsModule],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
