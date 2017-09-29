import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton , ReferenceInput, SelectInput} from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';
import { connect } from 'react-redux';


const mapStateToProps = state => ({ idUser: state.login.id })

export default connect(mapStateToProps)((props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="name" validate={required} />
            <ReferenceInput source="institution" reference="institution" filter={{ director_id: props.idUser }}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
));