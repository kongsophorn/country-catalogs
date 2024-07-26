
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CountriesActions, CountriesActionTypes } from './country.actions';

export interface State {
    data: any;
    action: string;
    isSuccess: boolean;
    isFail: boolean;
    isWarn: boolean;
    message: string;
}

const initialState: State = {
    data: null,
    action: '',
    isSuccess: false,
    isFail: false, 
    isWarn: false,
    message: ''
};

export function fromCountryReducer(state = initialState, action: CountriesActions): State {
    switch (action.type){

        case CountriesActionTypes.GET_COUNTRIES:
            return {
                ...state,
                data: null,
                action: CountriesActionTypes.GET_COUNTRIES,
                isSuccess: false,
                isFail: false,
                isWarn: false,
                message: ''
            };
        case CountriesActionTypes.GET_COUNTRIES_SUCCESS:
            return {
                ...state,
                data: action.responseData,
                action: CountriesActionTypes.GET_COUNTRIES_SUCCESS,
                isSuccess: true,
                isFail: false,
                isWarn: false,
                message: ''
            };
    
        case CountriesActionTypes.GET_COUNTRIES_FAIL:
            return {
                ...state,
                data: null,
                action: CountriesActionTypes.GET_COUNTRIES_FAIL,
                isSuccess: false,
                isFail: true,
                isWarn: false,
                message: action.message
            };
        }
        
        return state;
    }


/*************************
 * SELECTORS
 ************************/

export const getCountryState = createFeatureSelector <State> ('country');

export const getCountriesSuccess = createSelector(getCountryState, (state: State) => {

    if ( state.action === CountriesActionTypes.GET_COUNTRIES_SUCCESS && state.isSuccess === true) {

        return state.data;
    }

    return null;
});

export const getCountriesError = createSelector(getCountryState, (state: State) => {

    if ( state.action === CountriesActionTypes.GET_COUNTRIES_FAIL && state.isFail === true) {

        return state.message;
    }

    return '';
});



