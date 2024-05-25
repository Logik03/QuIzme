import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from '../../shared/shared.module';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [OverviewComponent, SettingsComponent],
  imports: [CommonModule, DashboardRoutingModule, SharedModule ],
})
export class DashboardModule {}
