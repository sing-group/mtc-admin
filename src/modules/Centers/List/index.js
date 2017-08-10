import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton, ShowButton } from 'admin-on-rest';
import { Admin ,SwitchPermissions,Permission} from 'aor-permissions';

import auth from '../../../utils/auth';

export default (props) => (
    <SwitchPermissions authClient={auth} {...props}>
        <Permission value="GA">
            <List {...props}>
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="description" />
                    <ReferenceField source="director_id" reference="directors" linkType="none">
                        <TextField source="name" />
                    </ReferenceField>
                    <EditButton />
                    <ShowButton />
                </Datagrid>
            </List>
        </Permission>
        <Permission value={"CD"}>
            <List {...props} /* TODO filter={{ director_id: }}*/>
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="description" />
                </Datagrid>
            </List>
        </Permission>
    </SwitchPermissions>
);