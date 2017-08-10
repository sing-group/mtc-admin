import React from 'react';
import { List, Datagrid, TextField,ReferenceField , EditButton, ShowButton} from 'admin-on-rest';

export default (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="description" />
            <ReferenceField source="director_id" reference="directors" linkType="show">
                <TextField source="name" />
            </ReferenceField>
            <EditButton/>
            <ShowButton/>
        </Datagrid>
    </List>
);