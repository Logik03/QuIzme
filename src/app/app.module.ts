import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
//import { reducers, metaReducers} from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { NotifierModule} from 'angular-notifier';
//import { environment } from 'src/environments/environments.prod';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestInterceptor } from './core/interceptors/request-interceptor.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NotifierModule.withConfig({
       position: {
        horizontal: {
          position: "right",
        },
        vertical: {
          position: "top",
        },
      },
    }),
    StoreModule.forRoot({}, {}),
    //StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ 
      maxAge: 25, 
      logOnly: !isDevMode() 
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
