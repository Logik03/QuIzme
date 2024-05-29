import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from '../../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';
import { GameBoardComponent } from '../game-board/game-board.component';

@NgModule({
  declarations: [OverviewComponent, SettingsComponent, GameBoardComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardModule {}
