import React, {Component} from "react";
import PropTypes from "prop-types";

import check from "check-types";

import {
  Create,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  translate
} from "admin-on-rest";

const validateInstitutionCreation = (values, {translate}) => {
  const errors = {};

  if (check.not.assigned(values.manager))
    errors.manager = [translate("aor.validation.required")];

  return errors;
};

class InstitutionCreate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Create {...this.props}>
      <SimpleForm validate={validateInstitutionCreation} redirect="list">
        <TextInput source="name" validate={[required]}/>
        <TextInput source="description" options={{multiLine: true}} validate={[required]}/>
        <TextInput source="address" options={{multiLine: true}} validate={[required]}/>
        <ReferenceInput
          allowEmpty
          source="manager"
          reference="manager"
          validate={[required]}>
          <SelectInput optionText="fullname" validate={[required]}/>
        </ReferenceInput>
      </SimpleForm>
    </Create>;
  }
}

InstitutionCreate.propTypes = {
  translate: PropTypes.func
};

export default translate(InstitutionCreate);