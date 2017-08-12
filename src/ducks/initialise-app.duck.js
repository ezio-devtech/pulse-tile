import Rx, { Observable } from 'rxjs';
import { createAction } from 'redux-actions';

import { fetchInitialiseRequest, FETCH_INITIALISE_SUCCESS } from './fetch-initialise.duck'
import { fetchUserAccountRequest, FETCH_USER_ACCOUNT_SUCCESS } from './fetch-user-account.duck'
import { fetchPatientsRequest, FETCH_PATIENTS_SUCCESS } from './feth-patients.duck'

export const INITIALISE_START = 'INITIALISE_START';
export const INITIALISE_SUCCESS = 'INITIALISE_SUCCESS';
export const INITIALISE_FAILURE = 'INITIALISE_FAILURE';

export const initialiseStart = createAction(INITIALISE_START);
export const initialiseSuccess = createAction(INITIALISE_SUCCESS);
export const initialiseFailure = createAction(INITIALISE_FAILURE);

export const initialiseEpic = (action$, store) => Observable.merge(
  action$
    .ofType(INITIALISE_START)
    .map(fetchInitialiseRequest),
  action$
    .ofType(FETCH_INITIALISE_SUCCESS)
    .map(fetchUserAccountRequest),
  action$
    .ofType(FETCH_USER_ACCOUNT_SUCCESS)
    .map(fetchPatientsRequest),
  action$
    .ofType(FETCH_PATIENTS_SUCCESS)
    .map(initialiseSuccess)
);
