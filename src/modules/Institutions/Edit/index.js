import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton ,ReferenceInput,SelectInput} from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';


export default (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={[required]}/>
            <TextInput source="description" options={{ multiLine: true }} validate={[required]} />
            <TextInput source="address" options={{ multiLine: true }} validate={[required]} />
            <ReferenceInput
                allowEmpty
                source="manager"
                reference="manager"
                validate={[required]}>
                <SelectInput optionText="login" validate={[required]}/>
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);