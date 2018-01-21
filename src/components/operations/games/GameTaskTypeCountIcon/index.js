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
import React from 'react';

import IconButton from 'material-ui/IconButton';
import Avatar from 'material-ui/Avatar';

import PropTypes from 'prop-types';

import taskTypeColors from "../taskTypeColors";

import check from 'check-types';

export default class GameTaskTypeCountIcon extends React.Component {
  static get propTypes() {
    return {
      number: PropTypes.number.isRequired,
      style: PropTypes.shape({
        icon: PropTypes.object,
        avatar: PropTypes.object
      }),
      taskType: PropTypes.string.isRequired,
      tooltip: PropTypes.string
    };
  }

  static get defaultProps() {
    return {
      style: {
        icon: {},
        avatar: {}
      },
      tooltip: ""
    };
  }

  constructor(props) {
    super(props);

    check.assert.assigned(taskTypeColors[this.props.taskType], "taskType should exists: " + this.props.taskType);
  }

  render() {
    const {number, style, taskType, tooltip} = this.props;

    const colors = taskTypeColors[taskType];

    return <IconButton tooltip={tooltip} style={style.icon}>
      <Avatar key={taskType} style={style.avatar} size={25} color={colors.foregroundColor}
              backgroundColor={colors.backgroundColor}>{number}</Avatar>
    </IconButton>;
  }
}
