import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectInterestsComponent } from '../select-interests/select-interests.component';

const routes: Routes = [
  {
    path: '',
    component: SelectInterestsComponent,
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectInterestRoutingModule {}
