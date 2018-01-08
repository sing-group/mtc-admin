/*
 * MultiTasking Cubes Administration
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Francisco Rojas Rodríguez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 * Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 * Carlos Spuch Calvar, and Tania Rivera Baltanás
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import React, {Component} from "react";

import PropTypes from "prop-types";

import {translate} from "admin-on-rest";

import {parseids} from "../../../utils/parseKeys";

import {MenuItem, SelectField} from "material-ui";

class EnumStringParameterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errorText: ""
    };
  }

  check(value) {
    if (this.props.parameter.isValid(value)) {
      this.setState({
        errorText: ""
      });

      return false;
    } else {
      this.setState({
        errorText: this.props.translate("common.model.validation.invalidValue")
      });

      return true;
    }

  }

  handleChange(event, key, payload) {
    if (this.check(payload)) {
      this.props.onValueChange(payload);
    }
  }

  componentDidMount() {
    this.check(this.props.value);
  }

  render() {
    const {parameter, translate, value} = this.props;

    const items = parameter.values.map(value =>
      (<MenuItem key={value} value={value} primaryText={value}/>)
    );

    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        flexAlign: "flex-start",
        backgroundColor: "#f9fafc",
        margin: 5,
        padding: 5,
        boxShadow: this.state.errorText ? "0px 0px 2px 2px red" : "0px 0px 2px 2px #B3E5FC"
      }}>
        <span>{translate("common.model.games." + parseids(parameter.descriptionId))}</span>

        <SelectField
          style={{marginBottom: this.state.errorText ? 15 : 0}}
          value={value}
          floatingLabelText={translate("common.model.games." + parseids(parameter.nameId))}
          floatingLabelFixed={true}
          errorText={this.state.errorText}
          onChange={this.handleChange.bind(this)}
        >
          {items}
        </SelectField>

      </div>
    );
  }
}

EnumStringParameterComponent.propTypes = {
  onValueChange: PropTypes.func,
  parameter: PropTypes.object.isRequired,
  value: PropTypes.string.isRequired,
  translate: PropTypes.func.isRequired
};

export default translate(EnumStringParameterComponent);
