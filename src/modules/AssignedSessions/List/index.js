import React from 'react';
import {
  ChipField,
  Datagrid,
  DateField,
  DeleteButton,
  EditButton,
  List,
  ReferenceManyField,
  ShowButton,
  SingleFieldList,
  TextField,
  translate
} from 'admin-on-rest';

import {parse} from 'query-string'
import {connect} from 'react-redux'

const mapStateToProps = state => (!console.log("STATE LIST", state) && {patient: state.context.patient.editing});
export default translate(connect(mapStateToProps)((props) => !console.log("PROPIEDADES LIST", props) && (
  <List {...props}
        filter={parse(props.location.search).patient ? parse(props.location.search) : {patient: props.patient}}
        title={null}>
    <Datagrid>
      <TextField source="id"/>
      <DateField source="startDate"/>
      <DateField source="endDate"/>
      <EditButton/>
      <DeleteButton/>
    </Datagrid>
  </List>
)));