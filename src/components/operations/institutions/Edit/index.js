import React, {Component} from "react";

import {
  Edit,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from "admin-on-rest";

class InstitutionEdit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Edit {...this.props}>
      <SimpleForm>
        <TextInput source="name" validate={[required]}/>
        <TextInput source="description" options={{multiLine: true}} validate={[required]}/>
        <TextInput source="address" options={{multiLine: true}} validate={[required]}/>
        <ReferenceInput
          allowEmpty
          source="manager"
          reference="manager"
          validate={[required]}>
          <SelectInput optionText="fullname" validate={[required]}/>
        </ReferenceInput>
      </SimpleForm>
    </Edit>;
  }
}

export default InstitutionEdit;