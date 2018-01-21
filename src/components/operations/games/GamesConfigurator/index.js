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
import React, {Component} from 'react';

import PropTypes from 'prop-types';

import {arrayMove, SortableContainer, SortableElement} from 'react-sortable-hoc';
import {CardHeader} from 'material-ui/Card';

import {translate} from 'admin-on-rest';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import GameCard from './GameCard';

import GameTaskTypeRibbon from '../../games/GameTaskTypeRibbon';

import GamePicker from '../PickerModalGame';

import GameMetadataBuilder from '@sing-group/mtc-games/src/game/builder/GameMetadataBuilder';

const SortableItem = SortableElement(({value, onDeleteGame, onModifyPropGame}) => {
  return <GameCard game={value}
    onModifyPropGame={(p, v) => onModifyPropGame(p, v)}
    onDeleteGame={() => onDeleteGame()}
  />;
});

const Container = SortableContainer(({games, onDeleteGame, onModifyPropGame}) => {
  return <div>
    {games.map((game, index) => game && (
      <SortableItem key={game.sortableKey}
                    index={index}
                    value={game}
                    onDeleteGame={() => onDeleteGame(index)}
                    onModifyPropGame={(prop, newValue) => onModifyPropGame(index, prop, newValue)}
      />
    ))}
  </div>
});

class GamesConfigurator extends Component {
  constructor(props) {
    super(props);

    let key = 1;

    this.state = {
      open: false,
      games: props.games.map(g => GamesConfigurator.createGameDataFromGame(g, { sortableKey: key++ })),
      keyCount: props.games.length + 1
    };
  }


  static createGameDataFromGameId(gameId, additionalProps = {}) {
    const builder = new GameMetadataBuilder();

    const metadata = builder.buildGameMetadata(gameId);

    const parametersValues = metadata.parameters.reduce((values, param) => {
      values[param.id] = param.defaultValue;
      return values;
    }, {});

    return GamesConfigurator.createGameData(gameId, parametersValues, additionalProps);
  }

  static createGameDataFromGame(game, additionalProps = {}) {
    const parametersValues = game.parameter.reduce((p, c) => {
      p[c.key] = c.value;
      return p
    }, {});

    return GamesConfigurator.createGameData(game.gameId, parametersValues, additionalProps);
  }

  static createGameData(gameId, parametersValues, additionalProps = {}) {
    const builder = new GameMetadataBuilder();

    const metadata = builder.buildGameMetadata(gameId);

    return Object.assign({}, additionalProps, {
      id: metadata.id,
      nameId: metadata.nameId,
      parameters: metadata.parameters,
      parametersValues: parametersValues,
      tasks: metadata.taskTypes,
      valid: true
    });
  }

  _updateGames(newGames, additionalUpdates = {}) {
    this.setState(Object.assign({}, this.state, additionalUpdates, {
      games: newGames
    }));
  }

  handleSortEnd({oldIndex, newIndex}) {
    this._updateGames(arrayMove(this.state.games, oldIndex, newIndex));
  }

  handleGameModified(index, prop, newValue) {
    const games = [...this.state.games];

    games[index].parametersValues[prop] = newValue;

    let valid = true;
    games[index].parameters.forEach(param => {
      if (valid) {
        valid = param.isValid(this.state.games[index].parametersValues[param.id])
      }

    });
    games[index].valid = valid;

    this._updateGames(games);

    this.forceUpdate();
  }

  handleOpen() {
    this.setState(Object.assign({}, this.state, {open: true}));
  }

  handleClose() {
    this.setState(Object.assign({}, this.state, {open: false}));
  }

  handleAddGames(games) {
    let keyCount = this.state.keyCount;

    const newGames = [
      ...this.state.games,
      ...games.map((key) => GamesConfigurator.createGameDataFromGameId(key, {sortableKey: keyCount++}))
    ];

    this.setState({
      games: newGames,
      keyCount: keyCount,
      open: false
    });
  }

  handleGameRemove(index) {
    const games = [...this.state.games];

    games.splice(index, 1);

    this._updateGames(games);
  }

  handleConfigurationEnd() {
    this.props.onConfigurationEnd(this.state.games);
  }

  render() {
    const {translate} = this.props;

    const metadataBuilder = new GameMetadataBuilder();

    const metadatas = this.state.games.map(game => metadataBuilder.buildGameMetadata(game.id));

    return (
      <div style={{display: "flex", flexDirection: "column"}}>
        <div style={{backgroundColor: "#bfbfbf", display: "flex", flexDirection: "column"}}>
          <Toolbar>
            <ToolbarGroup firstChild={true}>
              <CardHeader title={translate("game.configurator.toolbar.options")}/>
            </ToolbarGroup>
            <ToolbarGroup>
              <GameTaskTypeRibbon metadata={metadatas} translate={translate}/>
              <FontIcon className="material-icons">sort</FontIcon>
            </ToolbarGroup>
          </Toolbar>
          <Container games={this.state.games}
                     onSortEnd={({oldIndex, newIndex}) => this.handleSortEnd({oldIndex, newIndex})}
                     onDeleteGame={(index) => this.handleGameRemove(index)}
                     onModifyPropGame={(index, prop, newValue) => this.handleGameModified(index, prop, newValue)}/>
          <RaisedButton style={{margin: 5}}
                        label={translate("session.create.addGame")}
                        onClick={this.handleOpen.bind(this)}/>
          <RaisedButton primary={true}
                        style={{margin: 5}}
                        label={translate("session.create.endConfiguration")}
                        onClick={() => this.handleConfigurationEnd()}/>
          <GamePicker open={this.state.open}
                      onRequestClose={this.handleClose.bind(this)}
                      onGamesAdded={(games) => this.handleAddGames(games)}/>
        </div>
      </div>
    );
  }
}

GamesConfigurator.propTypes = {
  translate: PropTypes.func,
  onConfigurationEnd: PropTypes.func,
  games: PropTypes.array
};

export default translate(GamesConfigurator);

