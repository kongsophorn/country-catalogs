

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, MetaReducer, ActionReducerMap, ActionReducer } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { environment } from '../../environment/environtment-pru';
import * as fromApp from '../stores/app.reducer';
import { CountryEffects } from './country/country.effects';

  export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function(state, action) {

      return reducer(state, action);
    }
  }  

export const metaReducers: MetaReducer<any>[] = [debug];
    
@NgModule({
  imports: [
    StoreModule.forRoot(fromApp.appReducer, {
      
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
      metaReducers,
    }),
    EffectsModule.forRoot([
      CountryEffects,
     
    ]),
    !environment.api ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [],
})
export class AppStoreModule {}




