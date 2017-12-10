import React from 'react';
import {
  choices,
  Create,
  Datagrid,
  DateField,
  DateInput,
  DeleteButton,
  DisabledInput,
  Edit,
  EditButton,
  email,
  ListButton,
  LongTextInput,
  maxLength,
  maxValue,
  minLength,
  minValue,
  number,
  ReferenceManyField,
  regex,
  required,
  ShowButton,
  SimpleForm,
  TextField,
  TextInput,
  translate
} from 'admin-on-rest';
import {CardActions} from 'material-ui/Card';
import {Link} from 'react-router-dom';

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};

const PatientEditActions = translate(({patient, translate, basePath, data, refresh}) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={basePath}/>
    <DeleteButton basePath={basePath} record={data}/>
    {/* Add your custom actions */}

  </CardActions>
));

export default translate((props) => (
  <Edit actions={<PatientEditActions patient={props.match.params.id}/>} {...props}>
    <SimpleForm>
      <TextInput source="login" validate={[required]}/>
      <TextInput source="password"/>
    </SimpleForm>

  </Edit>
));