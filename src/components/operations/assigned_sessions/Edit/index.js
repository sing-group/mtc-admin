import React, {Component} from "react";
import {
  DateInput,
  Edit,
  ReferenceField,
  TextField,
  required,
  SimpleForm,
  translate
} from "admin-on-rest";
import PropTypes from "prop-types";

class AssignedSessionEdit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dateLocale = this.props.translate("common.dateLocales");

    return <Edit {...this.props} >
      <SimpleForm>
        <TextField source="patient"/>
        <ReferenceField
          source="assignedGamesSessions"
          reference="games-session">
          <TextField source={"name" + this.props.locale}/>
        </ReferenceField>
        <DateInput source="startDate" validate={[required]} options={{locale: dateLocale}}/>
        <DateInput source="endDate" validate={[required]} options={{locale: dateLocale}}/>
      </SimpleForm>
    </Edit>;
  }
}

AssignedSessionEdit.propTypes = {
  translate: PropTypes.func,
  locale: PropTypes.string
};

export default translate(AssignedSessionEdit);
