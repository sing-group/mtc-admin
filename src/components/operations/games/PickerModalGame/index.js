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

import {parseids} from "../../../../utils/parseKeys";

import {translate} from "admin-on-rest";
import PropTypes from "prop-types";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import {Card, CardHeader, CardText} from "material-ui/Card";

import GameMetadataBuilder from "@sing-group/mtc-games/src/game/builder/GameMetadataBuilder";

const styles = {
  radioButton: {
    marginTop: 16,
  },
  cardSelected: {
    marginTop: 10,
    boxShadow: "0px 0px 5px 5px #B3E5FC"
  },
  cardUnSelected: {
    marginTop: 10
  }
};

/**
 * Dialog content can be scrollable.
 */
class GamePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gamesSelected: [],
      actual: undefined
    };
  }

  hasSelectedGames() {
    return this.state.gamesSelected.length > 0;
  }

  getStyle(key) {
    return this.state.gamesSelected.includes(key) ? styles.cardSelected : styles.cardUnSelected;
  }

  handleClose() {
    this.props.onRequestClose();
  }

  handleCursorInGame(key) {
    this.setState(Object.assign({}, this.state, {actual: key}));
  }

  handleClickOnGame(key) {
    const newState = [...this.state.gamesSelected];

    if (newState.includes(key)) {
      newState.splice(newState.indexOf(key), 1);
    } else {
      newState.push(key);
    }

    this.setState(Object.assign({}, this.state, {gamesSelected: newState}));
  }

  handleAddGames() {
    this.props.onGamesAdded(this.state.gamesSelected);

    this.setState({
      gamesSelected: [],
      actual: undefined
    });
  }

  render() {
    const {translate, open} = this.props;

    const actions = [
      <FlatButton
        key="actionCancel"
        label={translate("aor.action.cancel")}
        primary={true}
        onClick={() => this.handleClose()}
      />,
      <FlatButton
        key="actionAddAgmes"
        label={translate("game.picker.addGames")}
        primary={true}
        disabled={!this.hasSelectedGames()}
        onClick={() => this.handleAddGames()}
      />
    ];

    return (
      <Dialog
        title={translate("game.picker.title")}
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={() => this.handleClose()}
        autoScrollBodyContent={true}
      >
        {GameMetadataBuilder.gameIds().map((gameId) => {
          const metadataBuilder = new GameMetadataBuilder();

          const metadata = metadataBuilder.buildGameMetadata(gameId);

          return (
            <Card key={gameId}
                  style={this.getStyle(gameId)}
                  onMouseEnter={() => this.handleCursorInGame(gameId)}
                  onClick={() => this.handleClickOnGame(gameId)}
                  zDepth={(this.state.actual === gameId) ? 3 : 1}>
              <CardHeader
                title={translate("common.model.games." + parseids(metadata.nameId))}
              />
              <CardText>
                {translate("common.model.games." + parseids(metadata.descriptionId))}
              </CardText>
            </Card>
          )
        })}
      </Dialog>
    );
  }
}

GamePicker.propTypes = {
  onGamesAdded: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  translate: PropTypes.func
};

export default translate(GamePicker);
