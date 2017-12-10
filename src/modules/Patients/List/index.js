import React from 'react';
import {Datagrid, EditButton, List, ShowButton, TextField, translate} from 'admin-on-rest';
import {Link} from 'react-router-dom';

import EditButtonAssignment from '../Common/EditButtonAssignment'

export default (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id"/>
      <EditButton/>
      <EditButtonAssignment/>
    </Datagrid>
  </List>
);