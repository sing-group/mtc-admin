
import React from 'react';
import { Show, SimpleShowLayout, Edit, Datagrid, SimpleForm, DisabledInput, DateField, EditButton, ReferenceManyField, TextField, TextInput, translate } from 'admin-on-rest';

export default translate(({translate, ...props}) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
        </SimpleShowLayout>
    </Show>
));