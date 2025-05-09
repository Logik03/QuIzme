import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { SelectInterestsComponent } from '../select-interests/select-interests.component';
import { SelectInterestRoutingModule } from './select-interests-routing.module';

@NgModule({
  declarations: [ SelectInterestsComponent],
  imports: [CommonModule,SelectInterestRoutingModule , SharedModule ],
})
export class SelectInterestsModule {}
