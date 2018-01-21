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
import React from "react";

import Chip from "material-ui/Chip";

import PropTypes from "prop-types";

import check from "check-types";

import taskTypeColors from "../taskTypeColors";

export default class GameTaskTypeIcon extends React.Component {
  static get propTypes() {
    return {
      message: PropTypes.string.isRequired,
      style: PropTypes.object,
      taskType: PropTypes.string.isRequired,
      tooltip: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      style: {}
    };
  }

  constructor(props) {
    super(props);

    check.assert.assigned(taskTypeColors[this.props.taskType], "taskType should exists: " + this.props.taskType);
  }

  render() {
    const {message, style, taskType} = this.props;

    const colors = taskTypeColors[taskType];

    return <Chip style={style} color={colors.foregroundColor}
                 backgroundColor={colors.backgroundColor}>{message}</Chip>;
  }
}
