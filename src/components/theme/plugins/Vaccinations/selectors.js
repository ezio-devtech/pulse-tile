import { createSelector } from 'reselect';
import _ from 'lodash/fp';

import { operationsOnCollection } from '../../../../utils/plugin-helpers.utils';
import { valuesNames } from './forms.config';

const vaccinationsPanelFormSelector = _.getOr({}, 'form.vaccinationsPanelFormSelector');
const vaccinationsCreateFormSelector = _.getOr({}, 'form.vaccinationsCreateFormSelector');

const patientVaccinationsSelector = createSelector(
  ({ patientsVaccinations }) => patientsVaccinations,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (patientsVaccinations, userId) => {
    const allVaccinations = operationsOnCollection.modificateDateForTable(patientsVaccinations[userId], valuesNames.DATE);
    return ({ allVaccinations, userId });
  }
);

const patientVaccinationsDetailSelector = createSelector(
  ({ vaccinationsDetail }) => vaccinationsDetail,
  (state, props) => _.getOr(null, 'match.params.userId', props),
  (vaccinationsDetail, userId) => {
    const vaccinationDetail = vaccinationsDetail[userId];
    return ({ vaccinationDetail, userId });
  }
);

const vaccinationPanelFormSelector = createSelector(vaccinationsPanelFormSelector,
  vaccinationPanelFormState => ({ vaccinationPanelFormState }));

const vaccinationsCreateFormStateSelector = createSelector(vaccinationsCreateFormSelector,
  vaccinationCreateFormState => ({ vaccinationCreateFormState }));

export { patientVaccinationsSelector, patientVaccinationsDetailSelector, vaccinationPanelFormSelector, vaccinationsCreateFormStateSelector }
