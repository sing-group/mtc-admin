import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton, ShowButton } from 'admin-on-rest';

export default (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceField source="center_id" reference="centers" linkType="none">
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
);