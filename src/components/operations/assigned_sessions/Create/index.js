import React, {Component} from 'react';

import PropTypes from 'prop-types';

import pure from 'recompose/pure';

import {
  Create,
  DateInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  translate
} from 'admin-on-rest';
import {connect} from 'react-redux';

const CustomTextField = ({ value, elStyle }) => {
  return <span style={elStyle}>{value}</span>;
};

CustomTextField.propTypes = {
  addLabel: PropTypes.bool,
  elStyle: PropTypes.object,
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

const PureTextField = pure(CustomTextField);

PureTextField.defaultProps = {
  addLabel: true,
};

const mapStateToProps = state => ({patient: state.context.patient.editing});

class CreateAssignedSessions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let patientField = null;
    let defaultValues = {};

    if (this.props.patient) {
      defaultValues = {patient: this.props.patient};
      patientField = <PureTextField
        label="resources.assignedSession.fields.patient"
        source="patient"
        value={this.props.patient}
      />
    } else {
      patientField = <ReferenceInput
        allowEmpty
        source="patient"
        reference="patient"
        validate={[required]}>
        <SelectInput optionText="login" validate={[required]}/>
      </ReferenceInput>;
    }

    return <Create {...this.props}>
      <SimpleForm redirect="list" defaultValue={defaultValues}>
        {patientField}
        <ReferenceInput
          allowEmpty
          source="gamesSessionId"
          reference="session"
          validate={[required]}>
          <SelectInput optionText={'name' + this.props.locale} validate={[required]}/>
        </ReferenceInput>
        <DateInput source="startDate" validate={[required]}/>
        <DateInput source="endDate" validate={[required]}/>
      </SimpleForm>
    </Create>;
  }
}

CreateAssignedSessions.propTypes = {
  patient: PropTypes.object,
  locale: PropTypes.string
}

export default translate(connect(mapStateToProps)(CreateAssignedSessions));

