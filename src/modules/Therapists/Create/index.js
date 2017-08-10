import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton ,ReferenceInput, SelectInput} from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';


export default (props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="name" validate={[required]}/>
            <ReferenceInput
                allowEmpty
                source="center_id"
                reference="centers"
                validate={[required]}>
                <SelectInput optionText="name" validate={[required]}/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);