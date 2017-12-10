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
  ReferenceField,
  ReferenceInput,
  ReferenceManyField,
  regex,
  required,
  SaveButton,
  SelectInput,
  ShowButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  translate
} from 'admin-on-rest';
import {connect} from 'react-redux';

import {CardActions} from 'material-ui/Card';

import {Link} from 'react-router-dom';

const mapStateToProps = state => ({});
export default translate(connect(mapStateToProps)((props) => !console.log("CREATING ASSIGNED", props) && (
  <Edit {...props} >
    <SimpleForm redirect={false}>
      <DateInput source="startDate" validate={[required]}/>
      <DateInput source="endDate" validate={[required]}/>

    </SimpleForm>
  </Edit>
)));
