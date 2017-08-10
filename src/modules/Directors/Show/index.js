
import React from 'react';
import { Show, SimpleShowLayout, Edit, Datagrid, SimpleForm, DisabledInput, DateField, EditButton, ReferenceManyField, TextField, TextInput, translate } from 'admin-on-rest';

export default translate(({translate, ...props}) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="name" />
            <ReferenceManyField label={translate("resources.directors.references.centersList")} reference="centers" target="director_id">
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleShowLayout>
    </Show>
));