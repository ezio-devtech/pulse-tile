import React, { PureComponent } from 'react';
import { Field, reduxForm } from 'redux-form'

import ValidatedInput from '../../../../form-fields/ValidatedInputFormGroup';
import ValidateTextareaFormGroup from '../../../../form-fields/ValidateTextareaFormGroup';
import DateInput from '../../../../form-fields/DateInput';
import { valuesNames, valuesLabels } from '../../ClinicalNotesCreate/ClinicalNotesCreateForm/values-names.config';

@reduxForm({
  form: 'clinicalNotesPanelFormSelector'
})
export default class ClinicalNotesPanelForm extends PureComponent {
  componentDidMount() {
    const { detail, initialize } = this.props;
    initialize(this.defaultValuesForm(detail));
  }
  defaultValuesForm(value) {
    const defaultFormValues = {
      [valuesNames.CLINICAL_NOTES_TYPE]: value.clinicalNotesType,
      [valuesNames.NOTE]: value.note,
      [valuesNames.AUTHOR]: value.author,
    };

    return defaultFormValues;
  }
  render() {
    const { detail } = this.props;
    return (
      <div className="panel-body-inner">
        <form name="clinicalNotesPanelForm" className="form">
          <div className="form-group-wrapper">
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.CLINICAL_NOTES_TYPE}
                  name={valuesNames.CLINICAL_NOTES_TYPE}
                  id={valuesNames.CLINICAL_NOTES_TYPE}
                  type="text"
                  placeholder=""
                  component={ValidatedInput}
                />
                <Field
                  label={valuesLabels.NOTE}
                  name={valuesNames.NOTE}
                  id={valuesNames.NOTE}
                  component={ValidateTextareaFormGroup}
                />
              </div>
            </div>
            <div className="row-expand">
              <div className="col-expand-left">
                <Field
                  label={valuesLabels.AUTHOR}
                  name={valuesNames.AUTHOR}
                  id={valuesNames.AUTHOR}
                  component={ValidatedInput}
                  props={{ disabled: true }}
                />
              </div>
              <div className="col-expand-right">
                <Field
                  label={valuesLabels.DATE}
                  name={valuesNames.DATE}
                  id={valuesNames.DATE}
                  component={DateInput}
                  props={{ disabled: true, value: detail.dateCreated, format: 'DD-MMM-YYYY' }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>)
  }
}
