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

import {arrayMove, SortableContainer, SortableElement} from "react-sortable-hoc";
import {CardHeader} from "material-ui/Card";

import {translate} from "admin-on-rest";
import {Toolbar, ToolbarGroup} from "material-ui/Toolbar";
import FontIcon from "material-ui/FontIcon";
import RaisedButton from "material-ui/RaisedButton";
import GameCard from "./GameCard";
import {parseids} from "../../../../utils/parseKeys";

import {buildIconTooltiped} from "../../../../data/games/taskTypes";
import {gameAdapter, gameBuilder} from "../../../../data/games/games";

import {grey50 as bgColor} from "material-ui/styles/colors";

import GamePicker from "..//PickerModalGame";

const styles = {
  avatar: {
    backgroundColor: "red"
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: bgColor
  },
  picker: {
    display: "flex",
  }
};

const SortableItem = SortableElement(({value, onDeleteGame, onModifyPropGame}) => {
  return <GameCard game={value}
    onModifyPropGame={(p, v) => onModifyPropGame(p, v)}
    onDeleteGame={() => onDeleteGame()}
  />;
});

const Container = SortableContainer(({games, onDeleteGame, onModifyPropGame}) =>
  <div>
    {games.map((game, index) => game && (
      <SortableItem key={game.sortableKey}
                    index={index}
                    value={game}
                    onDeleteGame={() => onDeleteGame(index)}
                    onModifyPropGame={(prop, newValue) => onModifyPropGame(index, prop, newValue)}
      />
    ))}
  </div>
);

function generateSummarySession(games = [], translate) {
  const taskInfo = {};

  games.forEach((game) => {
    if (!game) return;
    game.tasks.forEach((taskElement) => {
      if (!taskInfo[taskElement.id]) {
        taskInfo[taskElement.id] = 0
      }
      taskInfo[taskElement.id] += 1//game.tasks[taskElement._id]
    })
  });

  return Object.keys(taskInfo).map((taskElement) => (
    buildIconTooltiped(styles.avatar, taskElement, taskInfo[taskElement], translate("common.model.games." + parseids(taskElement)))
  ))
}

class GamesConfigurer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      games: props.games.map(g => gameAdapter(g))
    };
  }

  onSortEnd({oldIndex, newIndex}) {
    this.setState({
      games: arrayMove(this.state.games, oldIndex, newIndex)
    });
  }

  onGameRemove(index) {
    const games = this.state.games;
    games.splice(index, 1);

    this.setState({games: games})
  }

  gameModified(index, prop, newValue) {
    const newState = {
      games: [
        ...this.state.games
      ]
    };

    newState.games[index].parametersValues[prop] = newValue;

    let valid = true;
    newState.games[index].parameters.forEach(param => {
      if (valid) {
        valid = param.isValid(this.state.games[index].parametersValues[param.id])
      }

    });
    newState.games[index].valid = valid;

    this.setState(newState);

    this.forceUpdate();
  }

  onGamesAdded(games) {
    this.setState({
      games: [
        ...this.state.games,
        ...games.map((key) => gameBuilder(key, {sortableKey: Math.random()}))
      ]
    });
  }

  handleConfigurationEnd() {
    this.props.onConfigurationEnd(this.state.games);
  }

  render() {
    const {translate} = this.props;

    return (
      <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{backgroundColor: "#bfbfbf", display: "flex", flexDirection: "column"}}>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <CardHeader title={translate("game.configurer.toolbar.options")}/>
            </ToolbarGroup>
            <ToolbarGroup>
              {generateSummarySession(this.state.games, translate)}
              <FontIcon className="material-icons">sort</FontIcon>
            </ToolbarGroup>
          </Toolbar>
          <Container games={this.state.games}
                     onSortEnd={({oldIndex, newIndex}) => this.onSortEnd({oldIndex, newIndex})}
                     onDeleteGame={(index) => this.onGameRemove(index)}
                     onModifyPropGame={(index, prop, newValue) => this.gameModified(index, prop, newValue)}/>
          <RaisedButton style={{margin: 5}}
                        label={translate("session.create.addGame")}
                        onTouchTap={() => this.setState({open: true})}
                        onClick={() => this.setState({open: true})}/>
          <RaisedButton primary={true}
                        style={{margin: 5}}
                        label={translate("session.create.endConfiguration")}
                        onTouchTap={() => this.handleConfigurationEnd()}
                        onClick={() => this.handleConfigurationEnd()}/>
          <GamePicker open={this.state.open}
                      onRequestClose={() => this.setState({open: false})}
                      onGamesAdded={(games) => this.onGamesAdded(games)}/>
        </div>
      </div>
    );
  }
}

GamesConfigurer.propTypes = {
  translate: PropTypes.func,
  onConfigurationEnd: PropTypes.func,
  games: PropTypes.object
};

export default translate(GamesConfigurer);

