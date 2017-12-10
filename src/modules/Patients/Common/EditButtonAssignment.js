import React from 'react';
import {Datagrid, EditButton, List, ShowButton, TextField, translate} from 'admin-on-rest';

import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router-dom';

import ContentCreate from 'material-ui/svg-icons/content/create';
import {stringify} from 'query-string'

export default translate(({
                            basePath = '',
                            label = 'aor.action.edit',
                            record = {},
                            translate,
                          }) => (
  <FlatButton
    primary
    label={translate('resources.patient.partialEdits.assignmentDataEdit')}
    icon={<ContentCreate/>}
    containerElement={<Link to={{
      pathname: `/assignedSession`,
      search: stringify({patient: record.id})
    }}/>}
    style={{overflow: 'inherit'}}
  />
));