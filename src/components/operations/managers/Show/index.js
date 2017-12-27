import React, {Component} from "react";
import PropTypes from "prop-types";

import {
  Datagrid,
  EditButton,
  ReferenceManyField,
  Show,
  SimpleShowLayout,
  TextField,
  translate
} from "admin-on-rest";

class ManagerShow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {translate} = this.props;

    return <Show {...this.props}>
      <SimpleShowLayout>
        <TextField source="login"/>
        <TextField source="email"/>
        <TextField source="name"/>
        <TextField source="surname"/>
        <ReferenceManyField
          label={translate("resources.manager.references.institutionsList")}
          reference="institution"
          target="manager"
        >
          <Datagrid>
            <TextField source="name"/>
            <EditButton/>
          </Datagrid>
        </ReferenceManyField>
      </SimpleShowLayout>
    </Show>;
  }
}

ManagerShow.propTypes = {
  translate: PropTypes.func
};

export default translate(ManagerShow);
