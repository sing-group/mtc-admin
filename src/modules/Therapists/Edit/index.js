import React from 'react';
import {
  Edit,
  email,
  minLength,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput
} from 'admin-on-rest';
import {connect} from 'react-redux';


const mapStateToProps = state => ({idUser: state.login.id});

export default connect(mapStateToProps)((props) => (
  <Edit {...props}>
    <SimpleForm>
      <TextField source="login"/>
      <TextInput source="password" validate={[minLength(6)]}/>
      <TextInput source="email" validate={[required, email]}/>
      <TextInput source="name" validate={[required]}/>
      <TextInput source="surname" validate={[required]}/>
      <ReferenceInput source="institution" reference="institution" filter={{director_id: props.idUser}}>
        <SelectInput optionText="name" validate={[required]}/>
      </ReferenceInput>
    </SimpleForm>
  </Edit>
));