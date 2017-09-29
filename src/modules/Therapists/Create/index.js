import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, ReferenceInput, SelectInput, required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';
import { connect } from 'react-redux';


import {ADMIN,MANAGER,THERAPIST} from '../../../customControllers/PermissionsController'

const mapStateToProps = state => ({ /*userLogin: state.login.userLogin */})
const postDefaultValue = { role: THERAPIST };
export default connect(mapStateToProps)((props) => (
    <Create {...props}>
        <SimpleForm redirect="list" defaultValue={postDefaultValue}>
            <TextInput source="login" validate={[required]}/>
            <TextInput source="password" validate={[required, minLength(6)]}/>
            <TextInput source="email" validate={[required,email]}/>
            <TextInput source="name" validate={[required]}/>
            <TextInput source="surname" validate={[required]}/>
            <ReferenceInput
                allowEmpty
                source="institution"
                reference="institution"
                validate={[required]}
                /*filter={{ manager: props.userLogin }} ESTE FILTRO NO HACE FALTA SI LOS QUE RETORNAN SON YA LOS PERMITIDOS*/> 
                <SelectInput optionText="name" validate={[required]} />
            </ReferenceInput>
        </SimpleForm>
    </Create>
));