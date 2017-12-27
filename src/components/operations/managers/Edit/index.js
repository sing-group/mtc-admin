import React, {Component} from "react";

import {
  Edit,
  email,
  minLength,
  required,
  SimpleForm,
  TextInput,
  TextField
} from "admin-on-rest";

class EditManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Edit {...this.props}>
      <SimpleForm>
        <TextField source="login"/>
        <TextInput source="password" validate={[minLength(6)]}/>
        <TextInput source="email" validate={[required, email]}/>
        <TextInput source="name" validate={[required]}/>
        <TextInput source="surname" validate={[required]}/>
      </SimpleForm>
    </Edit>;
  }
}

export default EditManager;