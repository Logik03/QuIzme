import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { InterestComponentComponent } from './components/interest-component/interest-component.component';
import { DashboardNavbarComponent } from './components/dashboard-navbar/dashboard-navbar.component';
import { RouterModule } from '@angular/router';
import { AdsComponent } from './components/ads/ads.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopThreeComponent } from './components/top-three/top-three.component';
import { TopTenComponent } from './components/top-ten/top-ten.component';
import { FormsModule } from '@angular/forms';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    LoaderComponent,
    InterestComponentComponent,
    DashboardNavbarComponent,
    AdsComponent,
    TopThreeComponent,
    TopTenComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule,
  ],
  exports: [
    LoaderComponent,
    InterestComponentComponent,
    DashboardNavbarComponent,
    AdsComponent,
    TopThreeComponent,
    TopTenComponent,
    NgbModule,
  ],
})
export class SharedModule {}
