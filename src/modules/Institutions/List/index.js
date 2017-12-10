import React from 'react';
import {
  Datagrid,
  EditButton,
  List,
  Permission,
  ReferenceField,
  ShowButton,
  SwitchPermissions,
  TextField
} from 'admin-on-rest';
import {connect} from 'react-redux';


import {ADMIN, MANAGER} from '../../../customControllers/PermissionsController'

const mapStateToProps = state => ({loginUser: state.login.loginUser});

export default connect(mapStateToProps)((props) => (
  <List {...props} >
    {
      permissions => {
        return (permissions === ADMIN &&
          (<Datagrid>
            <TextField source="name"/>
            <TextField source="description"/>
            <ReferenceField source="manager" reference="manager" linkType="show">
              <TextField source="fullname"/>
            </ReferenceField>
            <EditButton/>
            <ShowButton/>
          </Datagrid>)
        )
        || (permissions === MANAGER &&
          (<Datagrid filter={{manager: props.loginUser}}>
            <TextField source="id"/>
            <TextField source="name"/>
            <TextField source="description"/>
          </Datagrid>)
        )
      }
    }
  </List>
))