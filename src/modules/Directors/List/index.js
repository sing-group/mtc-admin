import React from 'react';
import { List, Datagrid, TextField,ReferenceField } from 'admin-on-rest';

export default (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            
        </Datagrid>
    </List>
);