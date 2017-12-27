import React from "react";

import {
  DeleteButton,
  Edit,
  ListButton,
  TextField,
  SimpleForm,
  TextInput,
  translate,
  required,
  minLength
} from "admin-on-rest";

import {CardActions} from "material-ui/Card";


const cardActionStyle = {
  zIndex: 2,
  display: "inline-block",
  float: "right",
};

const PatientEditActions = translate(({basePath, data}) => (
  <CardActions style={cardActionStyle}>
    <ListButton basePath={basePath}/>
    <DeleteButton basePath={basePath} record={data}/>
    {/* Add your custom actions */}

  </CardActions>
));

export default translate((props) => (
  <Edit actions={<PatientEditActions patient={props.match.params.id}/>} {...props}>
    <SimpleForm>
      <TextField source="login"/>
      <TextInput source="password" validate={[required, minLength(6)]}/>
    </SimpleForm>
  </Edit>
));