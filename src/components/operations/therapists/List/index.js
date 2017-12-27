import React from "react";
import {Datagrid, EditButton, List, ReferenceField, ShowButton, TextField} from "admin-on-rest";
import {connect} from "react-redux";

const mapStateToProps = state => ({userLogin: state.login.userLogin});

export default connect(mapStateToProps)((props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="name"/>
      <TextField source="surname"/>
      <ReferenceField source="institution" reference="institution" linkType="none">
        <TextField source="name"/>
      </ReferenceField>
      <EditButton/>
      <ShowButton/>
    </Datagrid>
  </List>
));