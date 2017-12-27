import React, {Component} from "react";
import PropTypes from "prop-types";

import {
  ChipField,
  Datagrid,
  EditButton,
  List,
  ReferenceManyField,
  ShowButton,
  SingleFieldList,
  TextField,
  translate
} from "admin-on-rest";

class ManagerList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {translate} = this.props;

    return <List {...this.props}>
      <Datagrid>
        <TextField source="login"/>
        <TextField source="name"/>
        <TextField source="surname"/>
        <TextField source="email"/>
        <ReferenceManyField
          label={translate("resources.manager.references.institutionsList")}
          reference="institution"
          target="manager"
        >
          <SingleFieldList>
            <ChipField source="name"/>
          </SingleFieldList>
        </ReferenceManyField>
        <EditButton/>
        <ShowButton/>
      </Datagrid>
    </List>;
  }
}

ManagerList.propTypes = {
  translate: PropTypes.func
};

export default translate(ManagerList);