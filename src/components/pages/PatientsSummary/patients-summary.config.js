import React from 'react';
import { get } from 'lodash';
import { themePatientSummaryConfig } from '../../theme/config/plugins';
import {
  allergiesPrevImage,
  problemsPrevImage,
  contactsPrevImage,
  medicationsPrevImage,
} from './ImageSources';
import { themeConfigs } from '../../../themes.config';
import { isPluginVisible, rangePlugins } from '../../../utils/themeSettings-helper';

const problemsTitle = get(themeConfigs.patientsSummaryTitles, 'diagnoses', 'Problems / Diagnosis');
const contactsTitle = get(themeConfigs.patientsSummaryTitles, 'contacts', 'Contacts');
const allergiesTitle = get(themeConfigs.patientsSummaryTitles, 'allergies', 'Allergies');
const medicationsTitle = get(themeConfigs.patientsSummaryTitles, 'medications', 'Medications');

const corePatientsSummaryConfig = [
  {
    key: 'problems',
    panelId: 'summary-panel-problems',
    title: problemsTitle,
    emptyMessage: 'No information available',
    state: 'diagnoses',
    titleCheckboxes: problemsTitle,
    nameCheckboxes: 'problems',
    imgPreview: problemsPrevImage,
    isDefaultSelected: true,
  }, {
    key: 'contacts',
    panelId: 'summary-panel-contacts',
    title: contactsTitle,
    emptyMessage: 'No information available',
    titleCheckboxes: contactsTitle,
    state: 'contacts',
    nameCheckboxes: 'contacts',
    imgPreview: contactsPrevImage,
    isDefaultSelected: true,
  }, {
    key: 'allergies',
    panelId: 'summary-panel-allergies',
    title: allergiesTitle,
    emptyMessage: 'No information available',
    titleCheckboxes: allergiesTitle,
    state: 'allergies',
    nameCheckboxes: 'allergies',
    imgPreview: allergiesPrevImage,
    isDefaultSelected: true,
  }, {
    key: 'medications',
    panelId: 'summary-panel-medications',
    title: medicationsTitle,
    emptyMessage: 'No information available',
    titleCheckboxes: medicationsTitle,
    state: 'medications',
    nameCheckboxes: 'medications',
    imgPreview: medicationsPrevImage,
    isDefaultSelected: true,
  },
];

/**
 * This constant returns list of pattient summary plugins, excluded corePluginsToHide (themes settings)
 *
 * @return {array}
 */
const filterPatientsSummaryConfig = corePatientsSummaryConfig.filter(item => {
  const hiddenCorePlugins = get(themeConfigs, 'corePluginsToHide', []);
  return isPluginVisible(hiddenCorePlugins, item.state);
});
const totalSummaryConfig = filterPatientsSummaryConfig.concat(themePatientSummaryConfig);

export const patientsSummaryConfig = rangePlugins(totalSummaryConfig);

export const defaultViewOfBoardsSelected = {
  full: true,
  preview: false,
  list: false,
};
