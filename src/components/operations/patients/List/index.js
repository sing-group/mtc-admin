import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {Datagrid, EditButton, List, TextField, translate} from 'admin-on-rest';

import FlatButton from 'material-ui/FlatButton';
import EditButtonAssignmentIcon from 'material-ui/svg-icons/content/create';
import {Link} from 'react-router-dom';

import QueryOptions from "../../../../data/endpoints/QueryOptions";

class BaseEditAssignmentButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const queryOptions = new QueryOptions(1, 10, "id", "ASC", {patient: this.props.record.id});

    return <FlatButton
      primary
      label={this.props.translate('resources.patient.partialEdits.assignmentDataView')}
      icon={<EditButtonAssignmentIcon/>}
      containerElement={<Link to={{
        pathname: `/assigned-session`,
        search: queryOptions.buildAORQuery()
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
        <EditAssignmentButton/>
        <EditButton/>
      </Datagrid>
    </List>;
  }
}

export default translate(PatientList);