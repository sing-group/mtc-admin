import React,{Component} from "react";
import {Delete} from "admin-on-rest";

class DeleteGamesSession extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Delete {...this.props}/>;
  }
}

export default DeleteGamesSession;