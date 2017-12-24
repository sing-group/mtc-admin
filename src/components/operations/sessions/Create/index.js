import React, {Component} from 'react';

import {Create, translate} from 'admin-on-rest';

import SessionForm from '../Forms';

class GamesSessionCreate extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Create {...this.props}>
      <SessionForm redirect="list"/>
    </Create>;
  }
}

export default translate(GamesSessionCreate);


