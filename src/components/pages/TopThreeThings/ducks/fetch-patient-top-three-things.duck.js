import _ from 'lodash/fp';
import { Observable } from 'rxjs';
import { ajax } from 'rxjs/observable/dom/ajax';
import { createAction } from 'redux-actions';
import { get } from 'lodash';

import { usersUrls } from '../../../../config/server-urls.constants'
import { fetchPatientTopThreeThingsDetailRequest } from './fetch-patient-top-three-things-detail.duck';

export const FETCH_PATIENT_TOP_THREE_THINGS_REQUEST = 'FETCH_PATIENT_TOP_THREE_THINGS_REQUEST';
export const FETCH_PATIENT_TOP_THREE_THINGS_SYNOPSIS_REQUEST = 'FETCH_PATIENT_TOP_THREE_THINGS_SYNOPSIS_REQUEST';
export const FETCH_PATIENT_TOP_THREE_THINGS_SUCCESS = 'FETCH_PATIENT_TOP_THREE_THINGS_SUCCESS';
export const FETCH_PATIENT_TOP_THREE_THINGS_FAILURE = 'FETCH_PATIENT_TOP_THREE_THINGS_FAILURE';
export const FETCH_PATIENT_TOP_THREE_THINGS_UPDATE_REQUEST = 'FETCH_PATIENT_TOP_THREE_THINGS_UPDATE_REQUEST';

export const fetchPatientTopThreeThingsRequest = createAction(FETCH_PATIENT_TOP_THREE_THINGS_REQUEST);
export const fetchPatientTopThreeThingsSynopsisRequest = createAction(FETCH_PATIENT_TOP_THREE_THINGS_SYNOPSIS_REQUEST);
export const fetchPatientTopThreeThingsSuccess = createAction(FETCH_PATIENT_TOP_THREE_THINGS_SUCCESS);
export const fetchPatientTopThreeThingsFailure = createAction(FETCH_PATIENT_TOP_THREE_THINGS_FAILURE);
export const fetchPatientTopThreeThingsUpdateRequest = createAction(FETCH_PATIENT_TOP_THREE_THINGS_UPDATE_REQUEST);

export const fetchPatientTopThreeThingsEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TOP_THREE_THINGS_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/top3Things`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .map(response => fetchPatientTopThreeThingsSuccess({
          userId: payload.userId,
          topThreeThings: response,
        }))
        .catch(error => Observable.of(fetchPatientTopThreeThingsFailure(error)))
    );

export const fetchPatientTopThreeThingsSynopsisEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TOP_THREE_THINGS_SYNOPSIS_REQUEST)
    .mergeMap(({ payload }) =>

        ajax.getJSON(`http://dev.ripple.foundation:8000/api/patients/${payload.userId}/synopsis/top3Things`, {
            Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjY0OTIwNTIsImlhdCI6MTUyNjQ4ODQ1MiwiaXNzIjoicWV3ZC5qd3QiLCJhcHBsaWNhdGlvbiI6InJpcHBsZS1jZHItb3BlbmVociIsInRpbWVvdXQiOjM2MDAsInFld2QiOiJmMTU3MjQ0NWYxZmM3MWUwYTJkMzE1MTIxOGJmY2Q0ZWEzM2MwYjg1ZGY5MTFkMThhMTMyNjdkZWMzZDE2ODI5ZWYyNGQ1NWZkMzFiNjQzZjk3OGRhZDRkYmJmYjJhNGRiYTNjMjlkMDYxOGFjYWY1NmQ0NGI2MTU1NjUyYTZmYjQxMDhiZDE0ZWE1MzEyZWYwMDNkODVkMGNmZjI2YjJmNzQwZWQ3OGJiZWZiZGJlYzM4ZjJhYjFlZjg0MDI2MGMiLCJuaHNOdW1iZXIiOjk5OTk5OTkwMDAsImVtYWlsIjoiaXZvci5jb3hAcGhyLmxlZWRzLm5ocyIsInJvbGUiOiJwaHJVc2VyIiwidWlkIjoiNGU5MDhhNDI2NDVhNTMwYzQ3MjA3OTYyY2IxMzgwYjY4NzMyZGU4NjA4NTIzMjZlYTcxY2JhMzA1YWI2Nzg3Yy42MWM4YTljNWE3ZDJmNDZhIiwib3BlbmlkIjp7ImVtYWlsIjoiaXZvci5jb3hAcGhyLmxlZWRzLm5ocyIsIm5oc051bWJlciI6OTk5OTk5OTAwMCwic3ViIjoiZGY0ZTVjYzQtM2UzOC00NDllLThkNDQtOGMwYzQ3NDg4OTMxIiwiYXRfaGFzaCI6IjVsNzNYbjJaNUtHNFR0bkFKNzlJdEEiLCJhdWQiOiJmb28iLCJleHAiOjE1MjY0OTIwNDMsImlhdCI6MTUyNjQ4ODQ0MywiaXNzIjoiaHR0cDovL3d3dy5tZ2F0ZXdheS5jb206ODA4OSIsImlkX3Rva2VuIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0lzSW10cFpDSTZJbFoxY0V4eGRIWmhjbXR1UmtsNFgzVkNPRWRDY2tsWlRDMU5SbWQzZWxvM1lYUkpZMUZzWDNWWVVtOGlmUS5leUpsYldGcGJDSTZJbWwyYjNJdVkyOTRRSEJvY2k1c1pXVmtjeTV1YUhNaUxDSnVhSE5PZFcxaVpYSWlPams1T1RrNU9Ua3dNREFzSW5OMVlpSTZJbVJtTkdVMVkyTTBMVE5sTXpndE5EUTVaUzA0WkRRMExUaGpNR00wTnpRNE9Ea3pNU0lzSW1GMFgyaGhjMmdpT2lJMWJEY3pXRzR5V2pWTFJ6UlVkRzVCU2pjNVNYUkJJaXdpWVhWa0lqb2labTl2SWl3aVpYaHdJam94TlRJMk5Ea3lNRFF6TENKcFlYUWlPakUxTWpZME9EZzBORE1zSW1semN5STZJbWgwZEhBNkx5OTNkM2N1YldkaGRHVjNZWGt1WTI5dE9qZ3dPRGtpZlEuUEZzSVFUbGIyZTVJWnluVUZHUU1SSkpNOEdnaXlCZENoQldGUENJQ0pvNGE1eC1xTlMtV3JlOFBwWG5uN3FkTjRjVUlKMXh6R3BiVWx3ZDRtQ0lrTld4aWZYMVB2Q2pkM05Cc3I3NHk0R3c2OENfbDEzNXp5d3IxUm9kVXZtTVNkWjVLMGxPalprekpNWHV2OTFXclRDNkRXYjU0blZkeTdUY2VqVEU3akp1di0tYl9WRmVSaXFqUEJDMnhaWm1URnhpblliTmJxRXdWSnlDOXAtU2l0SVBGYjQ2NXY4UzkwVGFVaUxZTF9oY0trNVZZdE56bGtXTXNRdFU4OE1kc2pUSXFGdmdSbFloRDI3bDBkaGJZcXN1X0RDaWhldEptYjlreV9tcTlBbG5LcEdfYlVhTGJTZ3FvVC1aN2ZhMFQ0YzlmMjdOanhjVFV4SGs4WmJRb3pBIn19.VUDBl80OKu4PXF8FINs-s87TXABPN6sTsHVgbjaAWLM'
        })

      // ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/synopsis/top3Things`, {
      //   headers: { Cookie: store.getState().credentials.cookie },
      // })
        .map(response => fetchPatientTopThreeThingsSuccess({
          userId: payload.userId,
          topThreeThings: get(response, 'synopsis', []),
        }))
        .catch(error => Observable.of(fetchPatientTopThreeThingsFailure(error)))
    );

export const fetchPatientTopThreeThingsUpdateEpic = (action$, store) =>
  action$.ofType(FETCH_PATIENT_TOP_THREE_THINGS_UPDATE_REQUEST)
    .mergeMap(({ payload }) =>
      ajax.getJSON(`${usersUrls.PATIENTS_URL}/${payload.userId}/top3Things`, {
        headers: { Cookie: store.getState().credentials.cookie },
      })
        .flatMap((response) => {
          const userId = payload.userId;
          const sourceId = payload.sourceId;

          return [
            fetchPatientTopThreeThingsSuccess({ userId, topThreeThings: response }),
            fetchPatientTopThreeThingsDetailRequest({ userId, sourceId }),
          ]
        })
        .catch(error => Observable.of(fetchPatientTopThreeThingsFailure(error)))
    );

export default function reducer(patientsTopThreeThings = {}, action) {
  switch (action.type) {
    case FETCH_PATIENT_TOP_THREE_THINGS_SUCCESS:
      return _.set(action.payload.userId, action.payload.topThreeThings, patientsTopThreeThings);
    default:
      return patientsTopThreeThings;
  }
}
