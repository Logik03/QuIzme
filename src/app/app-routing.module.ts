import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';
import { SelectInterestsGuard } from './core/guards/select-interests.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'welcome' },
  {
    path: 'auth',
    loadChildren: () =>
      import(`./pages/authentication/authentication.module`).then(
        (m) => m.AuthModule
      ),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import(`./pages/dashboard/dashboard.module`).then(
        (m) => m.DashboardModule
      ),
     canActivate: [AuthGuard, SelectInterestsGuard],
  },
  {
    path: 'select-interests',
    loadChildren: () =>
      import('./pages/select-interests/select-interests.module').then(
        (m) => m.SelectInterestsModule
      ),
    canActivate: [AuthGuard],  // if needed
  },
  {
    path: 'welcome',
    component: LandingPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
