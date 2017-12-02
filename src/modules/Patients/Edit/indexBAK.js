import React, { Component } from 'react';
import { Create, Edit, List, SimpleForm, translate, DisabledInput, CreateButton, ReferenceField, Toolbar, TextInput, ReferenceArrayField, DateInput, DeleteButton, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton, ReferenceInput, SelectInput, TabbedForm, FormTab, ReferenceArrayInput, ShowButton } from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';

import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { stringify } from 'query-string'

import { GET } from 'admin-on-rest';
import restClient from '../../../customControllers/ApiController'

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAssignment as deleteAssignmentAction } from '../../AssignedSessions/Actions/deleteAssignment';

import { Tabs, Tab, Paper } from 'material-ui/Tabs';
import {
    Table,
    TableBody,
    TableFooter,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

import SwipeableViews from 'react-swipeable-views';

const styles = {
    headline: {
    },
    slide: {
        backgroundColor: 'white'
    },
};

export default translate(class TabsExampleSwipeable extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            value: 'a',
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: true,
            showRowHover: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false,
            height: '300px',
        };
    }
    componentWillMount() {


    }
    
      handleChange = (value) => {
        this.setState({
          value: value,
        });
      };

    render() {
        const tableData = [
        ];
        let props = this.props
        console.log("PROPIEDADES PARA EDIT", props)
        return (
            <div>
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                >
                    <Tab label="Tab A" value="a">
                    <Edit {...props} title={' '} >
                    <SimpleForm>
                        <TextInput source="login" validate={[required]} />
                        <TextInput source="password" />
                    </SimpleForm>
                </Edit>
                    </Tab>
                    <Tab label="Tab B" value="b">
                    <List {...props} resource={'assignedSession'} filter={{ patient: props.match.params.id }} actions={null} title={null}>
                            <Datagrid>
                                <TextField source="id" />
                                <DateField source="startDate" />
                                <DateField source="endDate" />
                                <EditButton />
                                <DeleteButton />
                            </Datagrid>
                        </List>

                        <PostCreateToolbar {...props} />
                    </Tab>
                </Tabs>
               

            </div>
        );
    }
})

const PostCreateToolbar = props => <Toolbar translate={props.translate} patient={props.match.params.id} >
    <FlatButton
        primary
        label={props.translate('aor.action.create')}
        icon={<ContentAdd />}
        containerElement={<Link
            to={{
                pathname: `/assignedSession/create`,
                search: stringify({ patient: props.patient })
            }}

        />}
    />
</Toolbar>;

const legacy = translate((props) => !console.log("PROPS", props) && (
    <Edit {...props}>
        <TabbedForm>
            <FormTab label={props.translate("resources.patient.name", 1)}>
                <TextInput source="login" validate={[required]} />
                <TextInput source="password" />
            </FormTab>
            <FormTab label={props.translate("resources.patient.fields.assignedSession")}>
                <ReferenceArrayField reference="assignedSession" source="assignedSession">
                    <Datagrid>
                        <ReferenceField source="session" reference="session">
                            <TextField source={"name" + props.locale} />
                        </ReferenceField>
                        <DateField source="assignmentDate" />
                        <DateField source="startDate" />
                        <DateField source="endDate" />
                        <DeleteButton />
                    </Datagrid>
                </ReferenceArrayField>
                <FlatButton
                    primary
                    label={props.translate('aor.action.create')}
                    icon={<ContentAdd />}
                    containerElement={<Link
                        to={{
                            pathname: `/assignedSession/create`,
                            search: stringify({ patient: props.match.params.id })
                        }}

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