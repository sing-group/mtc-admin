import React from 'react';
import { Create, Edit, SimpleForm, DisabledInput, TextInput, DateInput, LongTextInput, ReferenceManyField, Datagrid, TextField, DateField, EditButton } from 'admin-on-rest';
import { required, minLength, maxLength, minValue, maxValue, number, regex, email, choices } from 'admin-on-rest';
import { CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Link } from 'react-router-dom';

import ContentCreate from 'material-ui/svg-icons/content/create';
import { stringify } from 'query-string'
import { ListButton, ShowButton, DeleteButton } from 'admin-on-rest';
import { translate } from 'admin-on-rest';

const cardActionStyle = {
    zIndex: 2,
    display: 'inline-block',
    float: 'right',
};

const PatientEditActions = translate(({ patient, translate, basePath, data, refresh }) => (
    <CardActions style={cardActionStyle}>
        <ListButton basePath={basePath} />
        <DeleteButton basePath={basePath} record={data} />
        {/* Add your custom actions */}

    </CardActions>
));

export default translate( (props) => (
    <Edit actions={<PatientEditActions patient={props.match.params.id} />} {...props}>
        <SimpleForm>
            <TextInput source="login" validate={[required]} />
            <TextInput source="password" />
        </SimpleForm>
        
    </Edit>
));