import React, {Component} from "react";

import PropTypes from "prop-types";

import {
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  TextField,
  ReferenceInput,
  SelectInput,
  ReferenceField,
  Filter,
  translate
} from "admin-on-rest";

import {parse} from "query-string";

class AssignedSessionListFilter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Filter {...this.props}>
      <ReferenceInput source="patient" reference="patient" allowEmpty alwaysOn>
        <SelectInput optionText="login" />
      </ReferenceInput>
    </Filter>;
  }
}

class AssignedSessionList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const filter = {};

    const dateLocales = this.props.translate("common.dateLocales");
    const parsedPath = parse(this.props.location.search);
    if (this.props.patient) {
      filter.patient = this.props.patient;
    } else if (parsedPath.patient) {
      filter.patient = parsedPath.patient;
    }

    return <List {...this.props} filters={this.props.translate(<AssignedSessionListFilter/>)}>
      <Datagrid>
        <ReferenceField
          source="patient"
          reference="patient">
          <TextField source="login"/>
        </ReferenceField>
        <ReferenceField
          source="assignedGamesSessions"
          reference="games-session"
          sortable={false}>
          <TextField source={"name" + this.props.locale}/>
        </ReferenceField>
        <DateField source="startDate" locales={dateLocales}/>
        <DateField source="endDate" locales={dateLocales}/>
        <EditButton/>
        <DeleteButton/>
      </Datagrid>
    </List>;
  }
}

AssignedSessionList.propTypes = {
  location: PropTypes.object,
  patient: PropTypes.object,
  locale: PropTypes.string,
  translate: PropTypes.func
};

export default translate(AssignedSessionList);