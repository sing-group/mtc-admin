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
  TextInput,
  translate
} from 'admin-on-rest';

const validateInstitutionCreation = (values, {translate}) => {
  const errors = {};
  if (values.manager == null)
    errors.manager = [translate("aor.validation.required")];
  return errors
};

export default (props) => (
  <Create {...props}>
    <SimpleForm validate={validateInstitutionCreation} redirect="list">
      <TextInput source="name" validate={[required]}/>
      <TextInput source="description" options={{multiLine: true}} validate={[required]}/>
      <TextInput source="address" options={{multiLine: true}} validate={[required]}/>
      <ReferenceInput
        allowEmpty
        source="manager"
        reference="manager"
        validate={[required]}>
        <SelectInput optionText="login" validate={[required]}/>
      </ReferenceInput>
    </SimpleForm>
  </Create>
);