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

const mapStateToProps = state => ({patient: state.context.patient.editing});
export default translate(connect(mapStateToProps)((props) => !console.log("CREATING ASSIGNED", props) && (
  <Create {...props} >
    <SimpleForm defaultValue={{patient: props.patient}} redirect="list">
      <DateInput source="startDate" validate={[required]}/>
      <DateInput source="endDate" validate={[required]}/>

      <ReferenceInput
        allowEmpty
        source="gamesSessionId"
        reference="session"
        validate={[required]}>
        <SelectInput optionText={'name' + props.locale} validate={[required]}/>
      </ReferenceInput>

    </SimpleForm>
  </Create>
)));

const cardActionStyle = {
  zIndex: 2,
  display: 'inline-block',
  float: 'right',
};

