import { Action } from "@ngrx/store";

export enum CountriesActionTypes {
      GET_COUNTRIES = '[Country] Get Countries',
      GET_COUNTRIES_SUCCESS = '[Country] Get Countries Success',
      GET_COUNTRIES_FAIL = '[Country] Get Countries Fail',

}

export class GetCountries implements Action {
   readonly type = CountriesActionTypes.GET_COUNTRIES;
   constructor(public payload: any) { }
}

export class GetCountriesSuccess implements Action {
   readonly type = CountriesActionTypes.GET_COUNTRIES_SUCCESS;
   constructor(public responseData: any) { }
}

export class GetCountriesFail implements Action {
   readonly type = CountriesActionTypes.GET_COUNTRIES_FAIL;
   constructor(public message: string) { }
}

export type CountriesActions = 
            GetCountries | 
            GetCountriesSuccess |
            GetCountriesFail;
                         
