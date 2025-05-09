import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
//import { reducers, metaReducers} from './reducers';
//import { NavigationSerializer } from '@store/router.store/router.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    // StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    // StoreRouterConnectingModule.forRoot({
    //   serializer: NavigationSerializer,
    //   stateKey: 'router'
    // }),
  ]
})
export class StoreCoreModule { }
