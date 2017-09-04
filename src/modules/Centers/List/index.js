import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton, ShowButton } from 'admin-on-rest';
import { Admin ,SwitchPermissions,Permission} from 'aor-permissions';
import { connect } from 'react-redux';

import auth from '../../../utils/auth';

const mapStateToProps = state => ({ idUser: state.login.id })

export default connect(mapStateToProps)((props) => (
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
            <List {...props} filter={{ director_id: props.idUser }}>
                <Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="description" />
                </Datagrid>
            </List>
        </Permission>
    </SwitchPermissions>
));