import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton , ReferenceInput, SelectInput} from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';


export default (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required} />
        </SimpleForm>
    </Edit>
);