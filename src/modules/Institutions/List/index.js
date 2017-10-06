import React from 'react';
import { List, Datagrid, TextField, ReferenceField, EditButton, ShowButton, Admin, SwitchPermissions, Permission } from 'admin-on-rest';
import { connect } from 'react-redux';


import { ADMIN, MANAGER, THERAPIST } from '../../../customControllers/PermissionsController'

const mapStateToProps = state => ({ loginUser: state.login.loginUser })

export default connect(mapStateToProps)((props) => (
    <List {...props} >
        {permissions => {
            return (permissions === ADMIN &&
                (<Datagrid>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="description" />
                    <ReferenceField source="manager" reference="manager" linkType="none">
                        <TextField source="login" />
                    </ReferenceField>
                    <EditButton />
                    <ShowButton />
                </Datagrid>)
            ) || (permissions === MANAGER &&
                (<Datagrid filter={{ manager: props.loginUser }}>
                    <TextField source="id" />
                    <TextField source="name" />
                    <TextField source="description" />
                </Datagrid>)
                )

        }
        }
    </List>
))