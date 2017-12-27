import React, {Component} from "react";
import {ReferenceField, Show, SimpleShowLayout, TextField} from "admin-on-rest";

class InstitutionShow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Show {...this.props}>
      <SimpleShowLayout>
        <TextField source="name"/>
        <TextField source="description"/>
        <TextField source="address"/>
        <ReferenceField source="manager" reference="manager" linkType="false">
          <TextField source="fullname"/>
        </ReferenceField>
      </SimpleShowLayout>
    </Show>;
  }
}

export default InstitutionShow;