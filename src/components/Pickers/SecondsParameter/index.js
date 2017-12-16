import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {translate} from 'admin-on-rest';

import {parseids} from '../../../utils/parseKeys';

import TextField from 'material-ui/TextField';

import {SecondsParameter} from '../../../data/games/parameters';

class SecondsParameterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorText: ''
    };
  }

  check(v) {
    const value = parseInt(v);
    const max = SecondsParameter.MAX;
    const min = SecondsParameter.MIN;

    if (!this.props.parameter.isValid(value)) {
      this.setState({
        errorText: value > max ? this.props.translate('aor.validation.maxValue', {max}) : this.props.translate('aor.validation.minValue', {min})

      })
    } else
      this.setState({
        errorText: ''
      })
  }

  handleChange(event) {
    this.check(event.target.value);
    this.props.onValueChange(parseInt(event.target.value));
  }

  componentDidMount() {
    this.check(this.props.value)
  }

  render() {
    const {parameter, translate, value} = this.props;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexAlign: 'flex-start',
        backgroundColor: '#f9fafc',
        margin: 5,
        padding: 5,
        boxShadow: this.state.errorText ? "0px 0px 2px 2px red" : "0px 0px 2px 2px #B3E5FC"
      }}>
        <span>{translate("common.model.games." + parseids(parameter.descriptionId))}</span>
        <TextField
          style={{marginBottom: this.state.errorText ? 15 : 0}}
          value={value}
          errorText={this.state.errorText}
          onChange={event => this.handleChange(event)}
          type="number"
          floatingLabelText={translate("common.model.games." + parseids(parameter.nameId))}
          floatingLabelFixed={true}
        />

      </div>
    );
  }
}

SecondsParameterComponent.propTypes = {
  onValueChange: PropTypes.func,
  parameter: PropTypes.object,
  value: PropTypes.int,
  translate: PropTypes.func
};

export default translate(SecondsParameterComponent);