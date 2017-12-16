import React from 'react';

import {Create, translate} from 'admin-on-rest';

import SessionForm from '../Forms';

export default translate((props) => (
  <Create {...props}>
    <SessionForm/>
  </Create>
));


