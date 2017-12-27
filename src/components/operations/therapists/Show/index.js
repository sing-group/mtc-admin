import React, {Component} from "react";

import {
  ReferenceField,
  Show,
  SimpleShowLayout,
  TextField,
  translate
} from "admin-on-rest";

class TherapistShow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Show {...this.props}>
      <SimpleShowLayout>
        <TextField source="login"/>
        <TextField source="name"/>
        <TextField source="surname"/>
        <TextField source="email"/>
        <ReferenceField source="institution" reference="institution" linkType="false">
          <TextField source="name"/>
        </ReferenceField>
      </SimpleShowLayout>
    </Show>;
  }
}

export default translate(TherapistShow);