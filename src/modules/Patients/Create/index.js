import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, ShowButton ,ReferenceInput, SelectInput} from 'admin-on-rest';
import {PATIENT} from '../../../customControllers/PermissionsController'
import { connect } from 'react-redux';

import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';

const mapStateToProps = state => ({ loginUser: state.login.loginUser })
const postDefaultValue = { role: PATIENT };
export default connect(mapStateToProps)((props) => (
    <Create {...props}>
        <SimpleForm redirect="list"  defaultValue={{...postDefaultValue, therapist : props.loginUser}}>
            <TextInput source="login" validate={[required]}/>
            <TextInput source="password" validate={[required]}/>
        </SimpleForm>
    </Create>
));