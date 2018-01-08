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

import {games as GamesMetadata} from "../../../../data/games/games"

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
      open: props.open,
      actual: undefined
    }
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false, gamesSelected: [], actual: undefined});

    this.props.onRequestClose();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    });
  }

  handleCursorInGame(key) {
    this.setState({actual: key});
  }

  handleClickOnGame(key) {
    const index = this.state.gamesSelected.lastIndexOf(key);

    const aux = this.state.gamesSelected;
    if (index < 0) {
      aux.push(key);
    } else {
      aux.splice(index, 1);
    }

    this.setState({gamesSelected: aux});
  }

  onConfirmGames() {
    this.props.onGamesAdded(this.state.gamesSelected);
    this.handleClose();
  }

  getStyle(key) {
    return this.state.gamesSelected.lastIndexOf(key) < 0 ? styles.cardUnSelected : styles.cardSelected;
  }

  render() {
    const {translate} = this.props;

    const actions = [
      <FlatButton
        key="actionCancel"
        label={translate("aor.action.cancel")}
        primary={true}
        onTouchTap={() => this.handleClose()}
        onClick={() => this.handleClose()}
      />,
      <FlatButton
        key="actionAddAgmes"
        label={translate("game.picker.addGames")}
        primary={true}
        disabled={this.state.gamesSelected.length === 0}
        onTouchTap={() => this.onConfirmGames()}
        onClick={() => this.onConfirmGames()}
      />
    ];
    return (
      <Dialog
        title={translate("game.picker.title")}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={() => this.handleClose()}
        autoScrollBodyContent={true}
      >
        {Object.keys(GamesMetadata).map((key) => {
          const metadata = GamesMetadata[key].metadata;
          return (
            <Card style={this.getStyle(key)} key={key}
                  onMouseEnter={() => this.handleCursorInGame(key)}
                  onClick={() => this.handleClickOnGame(key)}
                  onTouchTap={() => this.handleClickOnGame(key)}
                  zDepth={(this.state.actual === key) ? 3 : 1}>
              <CardHeader
                title={translate("common.model.games." + parseids(metadata._nameId))}
              />
              <CardText>
                {translate("common.model.games." + parseids(metadata._descriptionId))}
              </CardText>
            </Card>
          )
        })
        }
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
