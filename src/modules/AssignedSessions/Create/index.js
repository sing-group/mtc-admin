import React from 'react';
import { Create, Edit, SimpleForm,ReferenceField,translate, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, ShowButton ,ReferenceInput, SelectInput} from 'admin-on-rest';
import {PATIENT} from '../../../customControllers/PermissionsController'
import { connect } from 'react-redux';

import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';

import { CardActions } from 'material-ui/Card';

import {parse, stringify} from 'query-string'

import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import Back from 'material-ui/svg-icons/hardware/keyboard-backspace';

const mapStateToProps = state => ({ })
export default translate(connect(mapStateToProps)((props) =>!console.log("CREATING ASSIGNED", props) && (
    <Create actions={<CreateActions translate={props.translate} patient={parse(props.location.search).patient}/>} {...props} >
        <SimpleForm redirect={false} defaultValue={{patient : parse(props.location.search).patient}}>
            <DateInput source="startDate" validate={[required]}/>
            <DateInput source="endDate" validate={[required]}/>

            <ReferenceInput
                allowEmpty
                source="gamesSessionId"
                reference="session"
                validate={[required]}>
                <SelectInput optionText={'name'+props.locale} validate={[required]}/>
            </ReferenceInput>

        </SimpleForm>
    </Create>
)));

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};
const CreateActions = ({ basePath, data, refresh, patient, translate }) => (
    <CardActions style={cardActionStyle}>
    <FlatButton
                    primary
                    label={translate('aor.action.back')}
                    icon={<Back />}
                    containerElement={<Link 
                    to={ `/patient/${patient}` }
                    
                    />}
                />
    </CardActions>
);