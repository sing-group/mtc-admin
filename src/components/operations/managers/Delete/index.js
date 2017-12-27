import React,{Component} from "react";
import {Delete} from "admin-on-rest";

class DeleteManager extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Delete {...this.props}/>;
  }
}

export default DeleteManager;