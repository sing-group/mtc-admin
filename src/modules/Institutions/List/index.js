import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton, ShowButton, Admin, SwitchPermissions, Permission } from 'admin-on-rest';
import { connect } from 'react-redux';

import auth from '../../../utils/auth';

const mapStateToProps = state => ({ /*tokenUser: state.login.token*/ })

export default connect(mapStateToProps)((props) => (
    <List {...props}>
        {permissions => {
            {
                permissions === 'ADMIN' && (
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        <TextField source="description" />
                        <ReferenceField source="manager" reference="manager" linkType="none">
                            <TextField source="login" />
                        </ReferenceField>
                        <EditButton />
                        <ShowButton />
                    </Datagrid>
                )
            }
            {
                permissions === 'MANAGER' && (
                    <Datagrid>
                        <TextField source="id" />
                        <TextField source="name" />
                        <TextField source="description" />
                    </Datagrid>
                )
            }

        }}
    </List>
))