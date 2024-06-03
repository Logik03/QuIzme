import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule, ActionReducerMap, ActionReducer, MetaReducer, State } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from './shared/shared.module';
import { NotifierModule} from 'angular-notifier';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS,HttpClientModule, HttpClient} from '@angular/common/http';
import { RequestInterceptor } from './core/interceptors/request-interceptor.interceptor';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthEffects } from './store/effects/auth.effects';
import { authReducer} from './store/reducers/auth.reducers';
import { gameReducer} from './store/reducers/game.reducers';
import { adReducer} from './store/reducers/ad.reducers';
import { playerReducer} from './store/reducers/player.reducers';
import { AppState } from './store/app.states';
import { GameEffects } from './store/effects/game.effects';
import { PlayerEffects } from './store/effects/player.effects';


const reducers: ActionReducerMap <AppState> = {
  authState: authReducer,
  gameState: gameReducer,
  adState: adReducer,
  playerState: playerReducer
};


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: [ 
      'authState',
      'gameState',
      'adState',
      'playerState',
    ], 
    storageKeySerializer: (key) => `cool_${key}`, 
    rehydrate:true
    })(reducer);
  }
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
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
    BrowserAnimationsModule,
    //StoreModule.forRoot({}, {}),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AuthEffects, GameEffects, PlayerEffects]),
    StoreDevtoolsModule.instrument({ 
      maxAge: 25, 
      logOnly: isDevMode() 
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
