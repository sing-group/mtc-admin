import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardTitle} from 'material-ui/Card';

import {CREATE, Create, translate} from 'admin-on-rest'

import {grey50 as bgColor} from 'material-ui/styles/colors';

import SessionForm from '../Forms'

const styles = {
  avatar: {
    backgroundColor: "red"
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: bgColor
  },
  picker: {
    display: 'flex',
  }
};

export default translate(class extends Component {

  render() {
    const {translate} = this.props;
    return (
      <Create {...this.props}>
        <SessionForm/>
      </Create>
    )
  }
})


