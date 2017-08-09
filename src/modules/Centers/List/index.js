import React from 'react';
import { List, Datagrid, TextField,ReferenceField } from 'admin-on-rest';

export default (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <ReferenceField source="director_id" reference="directors" linkType="show">
                <TextField source="name" />
            </ReferenceField>
        </Datagrid>
    </List>
);