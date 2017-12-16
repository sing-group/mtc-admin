import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  TextField,
  ReferenceField,
  translate
} from 'admin-on-rest';

import {parse} from 'query-string';

class AssignedSessionList extends Component {
  constructor(props) {
    super(props);

    console.log(props);
  }

  render() {
    const filter = {};

    const parsedPath = parse(this.props.location.search);
    if (this.props.patient) {
      filter.patient = this.props.patient;
    } else if (parsedPath.patient) {
      filter.patient = parsedPath.patient;
    }

    return <List {...this.props}>
      <Datagrid>
        <ReferenceField
          source="gamesSessionId"
          reference="session">
          <TextField source={'name' + this.props.locale}/>
        </ReferenceField>
        <DateField source="startDate"/>
        <DateField source="endDate"/>
        <EditButton/>
        <DeleteButton/>
      </Datagrid>
    </List>;
  }
}

AssignedSessionList.propTypes = {
  location: PropTypes.object,
  patient: PropTypes.object,
  locale: PropTypes.string
};

export default translate(AssignedSessionList);