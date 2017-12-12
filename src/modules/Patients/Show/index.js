import React from 'react';
import {
  SimpleShowLayout,
  TextField,
  translate
} from 'admin-on-rest';

export default translate(({translate, ...props}) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="login"/>
    </SimpleShowLayout>
  </Show>
));