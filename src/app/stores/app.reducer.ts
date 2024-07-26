import { ActionReducerMap } from '@ngrx/store';
import * as fromCountry from './country/country.reducer'


export interface AppState {
    country: fromCountry.State;
   
}

export const appReducer: ActionReducerMap<AppState, any> = {
    country: fromCountry.fromCountryReducer,

};
