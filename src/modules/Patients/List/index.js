import React from 'react';
import { List, Datagrid, TextField, EditButton, ShowButton } from 'admin-on-rest';

export default (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);