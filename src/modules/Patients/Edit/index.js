import React, {Component} from 'react';
import { Create, Edit, SimpleForm,translate, DisabledInput,CreateButton,ReferenceField, TextInput,ReferenceArrayField,DateInput, DeleteButton, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton , ReferenceInput, SelectInput,TabbedForm,FormTab,ReferenceArrayInput,ShowButton} from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';

import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {stringify} from 'query-string'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAssignment as deleteAssignmentAction } from '../../AssignedSessions/Actions/deleteAssignment';

export default translate((props) => !console.log("PROPS",props) && (
    <Edit {...props}>
    <TabbedForm>
            <FormTab label={props.translate("resources.patient.name",1)}>
                <TextInput source="login" validate={[required]}/>
                <TextInput source="password"/>
            </FormTab>
            <FormTab label={props.translate("resources.patient.fields.assignedSession")}>
                <ReferenceArrayField reference="assignedSession" source="assignedSession">
                    <Datagrid>
                        <ReferenceField source="session" reference="session">
                            <TextField source={"name"+props.locale} />
                        </ReferenceField>
                        <DateField source="assignmentDate" />
                        <DateField source="startDate" />
                        <DateField source="endDate" />
                        <DeleteButton/>
                    </Datagrid> 
                </ReferenceArrayField>
                <FlatButton
                    primary
                    label={props.translate('aor.action.create')}
                    icon={<ContentAdd />}
                    containerElement={<Link 
                    to={{ pathname : `/assignedSession/create`,
                            search : stringify({ patient : props.match.params.id }) }}
                    
                    />}
                />
            </FormTab>
    </TabbedForm>
    </Edit>
));

class DeleteButtonCustom extends Component {
    handleClick = () => {
        console.log(this.props)
        const { deleteAssignment, record } = this.props;
        deleteAssignment(record.id, record);
        // how about push and showNotification?
    }

    render() {
        return <FlatButton label={this.props.translate("aor.action.delete")} onClick={this.handleClick} />;
    }
}

DeleteButtonCustom.propTypes = {
    deleteAssignment: PropTypes.func,
    record: PropTypes.object,
};

const CustomDeleteButton = translate(connect(null, {
    deleteAssignment: deleteAssignmentAction,
})(DeleteButtonCustom));