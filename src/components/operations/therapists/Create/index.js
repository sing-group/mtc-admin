import React, {Component} from "react";

import {
  Create,
  email,
  minLength,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput
} from "admin-on-rest";

class TherapistCreate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Create {...this.props}>
      <SimpleForm redirect="list">
        <TextInput source="login" validate={[required]}/>
        <TextInput source="password" validate={[required, minLength(6)]}/>
        <TextInput source="email" validate={[required, email]}/>
        <TextInput source="name" validate={[required]}/>
        <TextInput source="surname" validate={[required]}/>
        <ReferenceInput
          allowEmpty
          source="institution"
          reference="institution"
          validate={[required]}
        >
          <SelectInput optionText="name" validate={[required]}/>
        </ReferenceInput>
      </SimpleForm>
    </Create>;
  }
}

export default TherapistCreate;