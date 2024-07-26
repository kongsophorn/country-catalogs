import { Injectable, Inject } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import * as CountriesActions from './country.actions';
import { map, catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { CountriesActionTypes } from './country.actions';
import { CountryService } from '../../services/country.service';


@Injectable()
export class CountryEffects {

    constructor(
        private actions$: Actions,
        private _countryService: CountryService,
    ) {}
    
    getCountry$ = createEffect(() => 
      this.actions$.pipe(
        ofType(CountriesActionTypes.GET_COUNTRIES),
        switchMap((action: CountriesActions.GetCountries) => 
          this._countryService.getAll(action).pipe(map(responseData => responseData ? 
              new CountriesActions.GetCountriesSuccess(responseData as any) : 
              new CountriesActions.GetCountriesFail('Something went wrong')
            ),
            catchError(error => of(new CountriesActions.GetCountriesFail('Failed to load Country')))
          )
        )
      )
    );
}