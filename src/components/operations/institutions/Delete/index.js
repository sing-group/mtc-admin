import React,{Component} from "react";
import {Delete} from "admin-on-rest";

class DeleteInstitution extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Delete {...this.props}/>;
  }
}

export default DeleteInstitution;