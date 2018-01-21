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

import GameTaskTypeCountIcon from "../GameTaskTypeCountIcon";
import {parseids} from '../../../../utils/parseKeys';

import GameMetadata from "@sing-group/mtc-games/src/game/metadata/GameMetadata";

import PropTypes from "prop-types";

import check from "check-types";

export default class GameTaskTypeRibbon extends React.Component {
  static get propTypes() {
    return {
      metadata: PropTypes.arrayOf(PropTypes.instanceOf(GameMetadata).isRequired),
      style: PropTypes.shape({
        wrapper: PropTypes.object,
        avatar: PropTypes.object
      }),
      translate: PropTypes.func.isRequired
    };
  }

  static get defaultProps() {
    return {
      metadata: [],
      style: {
        wrapper: {
          display: "flex",
          flexWrap: "wrap"
        },
        avatar: {}
      }
    };
  }

  render() {
    const {metadata, style, translate} = this.props;

    const taskTypeCount = metadata.map(metadata => metadata.taskTypes)
      .reduce((accumulator, taskTypes) => accumulator.concat(taskTypes), [])
      .map(taskType => taskType.id)
      .reduce((counter, taskId) => {
        if (!check.assigned(counter[taskId])) {
          counter[taskId] = 0;
        }

        counter[taskId]++;

        return counter;
      }, {});

    return <div style={style.wrapper}>
      {Object.keys(taskTypeCount).map((taskType) => <GameTaskTypeCountIcon
        key={taskType + "Icon"}
        taskType={taskType}
        number={taskTypeCount[taskType]}
        style={style.avatar}
        tooltip={translate("common.model.games." + parseids(taskType))}
      />)}
    </div>;
  }
}
