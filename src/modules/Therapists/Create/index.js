import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton ,ReferenceInput, SelectInput} from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';

import { connect } from 'react-redux';


const mapStateToProps = state => ({ idUser: state.login.id })

export default connect(mapStateToProps)((props) => (
    <Create {...props}>
        <SimpleForm redirect="list">
            <TextInput source="name" validate={[required]}/>
            <ReferenceInput
                allowEmpty
                source="center_id"
                reference="centers"
                validate={[required]}
                filter={{ director_id: props.idUser }}>
                <SelectInput optionText="name" validate={[required]}/>
            </ReferenceInput>
        </SimpleForm>
    </Create>
));