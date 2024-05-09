import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

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
    component: DashboardComponent,
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
