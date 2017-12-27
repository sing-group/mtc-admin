import React, {Component} from "react";
import {
  Show,
  ReferenceManyField,
  ReferenceField,
  SimpleShowLayout,
  TextField,
  DateField,
  EditButton,
  Datagrid,
  translate
} from "admin-on-rest";
import PropTypes from "prop-types";

class ShowPatient extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dateLocales = this.props.translate("common.dateLocales");

    return <Show {...this.props}>
      <SimpleShowLayout>
        <TextField source="login"/>
        <ReferenceManyField
          label={translate("resources.patient.partialEdits.assignmentDataEdit")}
          reference="assigned-session"
          target="patient"
          perPage={5}
        >
          <Datagrid>
            <ReferenceField
              source="patient"
              reference="patient">
              <TextField source="login"/>
            </ReferenceField>
            <ReferenceField
              source="gamesSessionId"
              reference="games-session">
              <TextField source={"name" + this.props.locale}/>
            </ReferenceField>
            <DateField source="startDate" locales={dateLocales}/>
            <DateField source="endDate" locales={dateLocales}/>
            <EditButton/>
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>
  }
}

ShowPatient.propTypes = {
  translate: PropTypes.func,
  locale: PropTypes.string
};

export default translate(ShowPatient);