import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton } from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';


export default (props) => (
    <Edit {...props}>
        <SimpleForm>
        <TextInput source="login" validate={[required]}/>
            <TextInput source="password" validate={[required, minLength(6)]}/>
            <TextInput source="email" validate={[required,email]}/>
            <TextInput source="name" validate={[required]}/>
            <TextInput source="surname" validate={[required]}/>
        </SimpleForm>
    </Edit>
);