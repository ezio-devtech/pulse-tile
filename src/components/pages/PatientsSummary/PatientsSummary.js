import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { lifecycle } from 'recompose';

import SimpleDashboardPanel from './SimpleDashboardPanel';
import ConfirmationModal from '../../ui-elements/ConfirmationModal/ConfirmationModal';
import PatientsSummaryListHeader from './header/PatientsSummaryListHeader';
import patientSummarySelector from './selectors';
import { patientsSummaryConfig, defaultCategorySelected } from '../../../config/patients-summary.config';
import { fetchPatientSummaryRequest } from '../../../ducks/fetch-patient-summary.duck';
import { fetchPatientSummaryOnMount } from '../../../utils/HOCs/fetch-patients.utils';
import { dashboardVisible } from '../../../plugins.config';

import imgAllergies from '../../../assets/images/patients-summary/allergies.jpg'
import imgProblems from '../../../assets/images/patients-summary/problems.jpg'
import imgContacts from '../../../assets/images/patients-summary/contacts.jpg'
import imgMedications from '../../../assets/images/patients-summary/medications.jpg'

const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ fetchPatientSummaryRequest }, dispatch) });

@connect(patientSummarySelector, mapDispatchToProps)
@lifecycle(fetchPatientSummaryOnMount)
export default class PatientsSummary extends PureComponent {
    static propTypes = {
      allergies: PropTypes.array.isRequired,
      contacts: PropTypes.array.isRequired,
      problems: PropTypes.array.isRequired,
      medications: PropTypes.array.isRequired,
    };

    static contextTypes = {
      router: PropTypes.shape({
        history: PropTypes.object,
      }),
    };

    state = {
      selectedCategory: defaultCategorySelected,
      isDisclaimerModalVisible: false
    };

    componentWillMount() {
      const isShowDisclaimerOfRedirect = localStorage.getItem('isShowDisclaimerOfRedirect');
      localStorage.removeItem('isShowDisclaimerOfRedirect');

      if (isShowDisclaimerOfRedirect) {
        this.setState({isDisclaimerModalVisible: true});
      }
    }

    closeDisclaimer = () => this.setState({isDisclaimerModalVisible: false});

    handleCategorySelected = selectedCategory => this.setState({ selectedCategory });

    handleGoToState = (state) => {
      this.context.router.history.replace(state);
    };

    render() {
      const { allergies, contacts, problems, medications } = this.props;
      const { selectedCategory, isDisclaimerModalVisible } = this.state;

      return (<section className="page-wrapper">
        <Row>
          <Col xs={12}>
            <div className="panel panel-primary panel-dashboard">
              <PatientsSummaryListHeader
                onCategorySelected={this.handleCategorySelected}
                selectedCategory={selectedCategory}
                title={'Home'}
              />
              <div className="panel-body">
                <div className="dashboard">
                  {(selectedCategory.problems && dashboardVisible.problems)
                    ? <SimpleDashboardPanel
                        title="Problems" items={problems}
                        navigateTo={console.log} state="diagnoses"
                        goToState={this.handleGoToState}
                        srcPrevirew={imgProblems} isPreview
                      />
                    : null}
                  {(selectedCategory.contacts && dashboardVisible.contacts)
                    ? <SimpleDashboardPanel
                        title="Contacts" items={contacts}
                        navigateTo={console.log} state="contacts"
                        goToState={this.handleGoToState}
                        srcPrevirew={imgContacts} isPreview
                      />
                    : null}
                  {(selectedCategory.allergies && dashboardVisible.allergies)
                    ? <SimpleDashboardPanel
                        title="Allergies" items={allergies}
                        navigateTo={console.log} state="allergies"
                        goToState={this.handleGoToState}
                        srcPrevirew={imgAllergies} isPreview
                      />
                    : null}
                  {(selectedCategory.medications && dashboardVisible.medications)
                    ? <SimpleDashboardPanel
                        title="Medications" items={medications}
                        navigateTo={console.log} state="medications"
                        goToState={this.handleGoToState}
                        srcPrevirew={imgMedications} isPreview
                      />
                    : null}
                </div>
              </div>
            </div>
          </Col>
        </Row>
        {isDisclaimerModalVisible && <ConfirmationModal
          title={'Notification'}
          isShow={true}
          onOk={onClose}
          onHide={onClose}
          isShowOkButton
        >
          <span>You was redirected to your home page because you are logged in as a PHR user.</span>
        </ConfirmationModal>}
      </section>)
    }
}
