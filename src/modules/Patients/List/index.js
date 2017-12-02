import React from 'react';
import { List, Datagrid, TextField, EditButton, ShowButton } from 'admin-on-rest';

import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import { translate } from 'admin-on-rest';

import ContentCreate from 'material-ui/svg-icons/content/create';
import { stringify } from 'query-string'

import EditButtonAssignment from '../Common/EditButtonAssignment'

export default (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id"/>
            <EditButton />
            <EditButtonAssignment/>
        </Datagrid>
    </List>
);