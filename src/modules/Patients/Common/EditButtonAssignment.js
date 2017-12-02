import React from 'react';
import { List, Datagrid, TextField, EditButton, ShowButton } from 'admin-on-rest';

import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router-dom';
import { translate } from 'admin-on-rest';

import ContentCreate from 'material-ui/svg-icons/content/create';
import { stringify } from 'query-string'

export default  translate (({
    basePath = '',
    label = 'aor.action.edit',
    record = {},
    translate,
}) => (
    <FlatButton
        primary
        label={translate('resources.patient.parcialEdits.assignmentDataEdit')}
        icon={<ContentCreate />}
        containerElement={<Link to={{
            pathname: `/assignedSession`,
            search: stringify({ patient: record.id })
        }}  />}
        style={{ overflow: 'inherit' }}
    />
));