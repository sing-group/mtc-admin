import React from 'react';
import { List, Datagrid, ChipField, ReferenceManyField, SingleFieldList, TextField, EditButton,ShowButton, translate } from 'admin-on-rest';

export default translate(({translate, ...props}) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <ReferenceManyField label={translate("resources.directors.references.centersList")}reference="centers" target="director_id">
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceManyField>
            <EditButton />
            <ShowButton />
        </Datagrid>
    </List>
));