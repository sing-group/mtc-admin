import React, {Component} from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import PropTypes from 'prop-types';

export default class DashBoard extends Component {
  render() {
    //const { translate } = this.context;
    return (
      <Card style={{margin: '2em'}}>
        <CardHeader title="Welcome to the administration"/>
        <CardText>Lorem ipsum sic dolor amet...</CardText>
      </Card>
    );
  }
}

DashBoard.contextTypes = {
  translate: PropTypes.func
};