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

import {arrayMove, SortableContainer, SortableElement} from "react-sortable-hoc";

import {translate} from "admin-on-rest";

import {Paper} from "material-ui";
import GameCard from "./GameCard";
import Toolbar from "./Toolbar";
import TitleCard from "./TitleCard";

import {buildIconTooltiped} from "../../data/mindInfo";


import {grey50 as bgColor} from "material-ui/styles/colors";


const styles = {
  avatar: {
    backgroundColor: "red"
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: bgColor
  }
};

const SortableItem = SortableElement(({value}) =>
  <GameCard game={value}/>
);

const SortableList = translate(SortableContainer(({games, translate}) => {
  return (
    <div>
      <Paper>
        <div style={styles.wrapper}>
          {generateSummarySession(games, translate)}
        </div>
      </Paper>
      <div style={{backgroundColor: "#bfbfbf"}}>
        <Toolbar/>
        {games.map((game, index) => (
          <SortableItem key={game.title} index={index} value={game}/>
        ))}
      </div>
    </div>
  );
}));

class SortableGames extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [
        {
          title: "game1",
          values: {
            car1: 5,
            car2: 3
          }
        },
        {
          title: "game2",
          values: {
            car1: 2
          }
        },
        {
          title: "game3",
          values: {
            car1: 1,
            car2: 1
          }
        }
      ]
    };
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState({
      games: arrayMove(this.state.games, oldIndex, newIndex),
    });
  }

  render() {
    return (
      <div>
        <Paper style={{padding: 20, marginBottom: 10}}>
          <TitleCard/>
        </Paper>
        <SortableList games={this.state.games} onSortEnd={this.onSortEnd}/>
      </div>
    );
  }
}

function generateSummarySession(games, translate) {
  const mindInfo = {};

  games.forEach((game) => {
    Object.keys(game.values).forEach((mindElement) => {
      if (!mindInfo[mindElement]) {
        mindInfo[mindElement] = 0
      }
      mindInfo[mindElement] += game.values[mindElement]
    })
  });

  return Object.keys(mindInfo).map((mindElement) => (
      buildIconTooltiped(styles.avatar, mindElement, mindInfo[mindElement], translate("common.model.mindValues." + mindElement))
    )
  );
}

export default SortableGames;
