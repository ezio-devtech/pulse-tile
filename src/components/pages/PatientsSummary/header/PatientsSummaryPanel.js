import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash/fp';
import { get } from 'lodash';
import { lifecycle } from 'recompose';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

import PTCustomInput from './PTCustomInput';
import { unmountOnBlur } from '../../../../utils/HOCs/unmount-on-blur.utils'
import { patientsSummaryConfig } from '../patients-summary.config';
import { themeConfigs } from '../../../../themes.config';
import { dashboardBeing } from '../../../../plugins.config';

import ExtraPatientsSummarySelectors from '../../../theme/components/ExtraPatientsSummarySelectors';

@lifecycle(unmountOnBlur)

export default class PatientsSummaryPanel extends PureComponent {
  static propTypes = {
    onCategorySelected: PropTypes.func.isRequired,
    onViewOfBoardsSelected: PropTypes.func.isRequired,
    selectedCategory: PropTypes.objectOf(PropTypes.bool).isRequired,
    selectedViewOfBoards: PropTypes.objectOf(PropTypes.bool).isRequired,
  };

  state = {
    selected: this.props.selectedCategory,
    selectedViewOptions: this.props.selectedViewOfBoards,
  };

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.selected, this.state.selected)) this.props.onCategorySelected(this.state.selected);
    if (!_.isEqual(prevState.selectedViewOptions, this.state.selectedViewOptions)) this.props.onViewOfBoardsSelected(this.state.selectedViewOptions);
  }

  toggleCheckbox = key => this.setState((prevState) => {
    const newValue = !_.get(['selected', key])(prevState);
    const keyName = 'isShow_' + key;
    localStorage.setItem(keyName, newValue);
    return _.set(['selected', key], newValue)(prevState);
  });

  toggleRadio = key => this.setState((prevState) => {
    const selectedViewOptions = Object.assign({}, prevState.selectedViewOptions);
    selectedViewOptions.full = false;
    selectedViewOptions.preview = false;
    selectedViewOptions.list = false;
    selectedViewOptions[key] = true;
    return { 'selectedViewOptions': selectedViewOptions };
  });

  render() {
    const { selected, selectedViewOptions } = this.state;
    const { patientsSummaryHasPreviewSettings, boards } = this.props;

    return (
      <div className="dropdown-menu dropdown-menu-panel dropdown-menu-summary">
        <div className="form-group-wrapper">
          <div className="heading">SHOW</div>
          <div className="form-group">
            <Row>
              {patientsSummaryConfig.map((item) => {
                return dashboardBeing[item.key] !== false ?
                  <Col xs={6} sm={4} key={item.nameCheckboxes}>
                    <PTCustomInput
                      type="checkbox"
                      title={item.titleCheckboxes}
                      id={item.nameCheckboxes}
                      name={item.nameCheckboxes}
                      isChecked={selected[item.key]}
                      onChange={this.toggleCheckbox}
                    />
                  </Col> : null
              })}
            </Row>
          </div>

          <ExtraPatientsSummarySelectors boards={boards} toggleCheckbox={this.toggleCheckbox} />

          {(themeConfigs.patientsSummaryHasPreviewSettings || patientsSummaryHasPreviewSettings) ?
            <div>
              <div className="heading">VIEW OF BOARDS</div>
              <div className="form-group">
                <Row>
                  <Col xs={12}>
                    <PTCustomInput type="radio" title="Headings + List" id="full" name="view-of-preview" value="full" isChecked={get(selectedViewOptions, 'full', null)} onChange={this.toggleRadio} />
                  </Col>
                </Row>
                <Row>
                  <Col xs={12}>
                    <PTCustomInput type="radio" title="Headings" id="preview" name="view-of-preview" value="preview" isChecked={get(selectedViewOptions, 'preview', null)} onChange={this.toggleRadio} />
                  </Col>
                </Row>
              </div>
            </div> : null}
        </div>
      </div>
    )
  }
}
