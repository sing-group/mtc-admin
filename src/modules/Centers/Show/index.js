import React from 'react';
import { Show, SimpleShowLayout, TextField, DateField, EditButton, RichTextField, ReferenceField } from 'admin-on-rest';

export default (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceField source="director_id" reference="centers" linkType="false">
                <TextField source="name" />
            </ReferenceField>
        </SimpleShowLayout>
    </Show>
);