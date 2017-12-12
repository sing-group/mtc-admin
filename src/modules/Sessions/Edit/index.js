import React from 'react';

import {Edit, translate} from 'admin-on-rest';

import SessionForm from '../Forms';

export default translate((props) => (
  <Edit {...props}>
    <SessionForm {...props}/>
  </Edit>
));

