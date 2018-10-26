import { combineEpics } from 'redux-observable';
import { get } from 'lodash';

import asyncComponent from '../../../components/containers/AsyncComponent/AsyncComponent';
import { clientUrls } from '../../../config/client-urls.constants';

import { fetchPatientDiagnosesEpic, fetchPatientDiagnosesSynopsisEpic } from './ducks/fetch-patient-diagnoses.duck';
import { fetchPatientDiagnosesUpdateEpic } from './ducks/fetch-patient-diagnoses.duck';
import { fetchPatientDiagnosesDetailEpic } from './ducks/fetch-patient-diagnoses-detail.duck';
import { fetchPatientDiagnosesDetailEditEpic } from './ducks/fetch-patient-diagnoses-detail-edit.duck';
import { fetchPatientDiagnosesCreateEpic } from './ducks/fetch-patient-diagnoses-create.duck';

import patientsDiagnoses from './ducks/fetch-patient-diagnoses.duck';
import diagnosesDetail from './ducks/fetch-patient-diagnoses-detail.duck';
import diagnosesDetailEdit from './ducks/fetch-patient-diagnoses-detail-edit.duck';
import patientDiagnosesCreate from './ducks/fetch-patient-diagnoses-create.duck';

import { themeConfigs } from '../../../themes.config';

const epics = combineEpics(fetchPatientDiagnosesEpic, fetchPatientDiagnosesSynopsisEpic, fetchPatientDiagnosesDetailEpic, fetchPatientDiagnosesDetailEditEpic, fetchPatientDiagnosesCreateEpic, fetchPatientDiagnosesUpdateEpic);
const ProblemsDiagnosis = asyncComponent(() => import(/* webpackChunkName: "diagnoses" */ './Diagnosis').then(module => module.default));

const reducers = {
  patientsDiagnoses,
  diagnosesDetail,
  diagnosesDetailEdit,
  patientDiagnosesCreate,
};

const problemsTitle = get(themeConfigs.patientsSummaryTitles, 'diagnoses', 'Problems / Diagnosis');
const sidebarConfig = { key: 'diagnoses', pathToTransition: '/diagnoses', name: problemsTitle, isVisible: true };

const routers = [
  { key: 'problems', component: ProblemsDiagnosis, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIAGNOSES}` },
  { key: 'problemsCreate', component: ProblemsDiagnosis, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIAGNOSES}/create` },
  { key: 'problemsDetail', component: ProblemsDiagnosis, path: `${clientUrls.PATIENTS}/:userId/${clientUrls.DIAGNOSES}/:sourceId` },
];

export default {
  component: ProblemsDiagnosis,
  epics, reducers, sidebarConfig, routers,
}