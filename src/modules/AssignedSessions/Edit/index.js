import React from 'react';
import {
  DateInput,
  Edit,
  required,
  SimpleForm,
  translate
} from 'admin-on-rest';

export default translate((props) => (
  <Edit {...props} >
    <SimpleForm redirect={false}>
      <DateInput source="startDate" validate={[required]}/>
      <DateInput source="endDate" validate={[required]}/>

    </SimpleForm>
  </Edit>
));
