import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Datagrid, EditButton, List, TextField, translate} from 'admin-on-rest';

import FlatButton from 'material-ui/FlatButton';
import EditButtonAssignmentIcon from 'material-ui/svg-icons/content/create';
import {Link} from 'react-router-dom';

import {stringify} from "query-string";

class BaseEditAssignmentButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <FlatButton
      primary
      label={this.props.translate('resources.patient.partialEdits.assignmentDataEdit')}
      icon={<EditButtonAssignmentIcon/>}
      containerElement={<Link to={{
        pathname: `/assignedSession`,
        search: stringify({patient: this.props.record.id})
      }}/>}
      style={{overflow: 'inherit'}}
    />;
  }
}

BaseEditAssignmentButton.propTypes = {
  record: PropTypes.object,
  translate: PropTypes.func
};

BaseEditAssignmentButton.defaultProps = {
  record: PropTypes.object
};

const EditAssignmentButton = translate(BaseEditAssignmentButton);


class PatientList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <List {...this.props}>
      <Datagrid>
        <TextField source="id"/>
        <EditButton/>
        <EditAssignmentButton/>
      </Datagrid>
    </List>;
  }
}

export default translate(PatientList);