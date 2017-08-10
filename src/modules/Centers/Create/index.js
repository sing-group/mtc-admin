import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton,  ReferenceInput, SelectInput ,translate } from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';

const validateCenterCreation = (values,{translate}) => {
    const errors = {};
    if (values.director_id == null)
        errors.director_id = [translate("aor.validation.required")];
    return errors
};

export default (props) => (
    <Create {...props}>
        <SimpleForm validate={validateCenterCreation} redirect="list">
            <TextInput source="name" validate={[required]}/>
            <TextInput source="description" options={{ multiLine: true }} validate={[required]} />
            <ReferenceInput
                allowEmpty
                source="director_id"
                reference="directors"
                validate={[required]}>
                <SelectInput optionText="name" validate={[required]}/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
);