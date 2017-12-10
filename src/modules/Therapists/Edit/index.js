import React from 'react';
import {
  choices,
  Create,
  Datagrid,
  DateField,
  DateInput,
  DisabledInput,
  Edit,
  EditButton,
  email,
  LongTextInput,
  maxLength,
  maxValue,
  minLength,
  minValue,
  number,
  ReferenceInput,
  ReferenceManyField,
  regex,
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
      <TextInput source="name" validate={required}/>
      <ReferenceInput source="institution" reference="institution" filter={{director_id: props.idUser}}>
        <SelectInput optionText="name"/>
      </ReferenceInput>
    </SimpleForm>
  </Edit>
));