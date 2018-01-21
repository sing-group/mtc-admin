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
import {translate} from "admin-on-rest"
import PropTypes from "prop-types";
import {Card, CardHeader, CardText} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";

import GameParameterEditorBuilder from "../../../Pickers";

import GameTaskTypeIcon from "../GameTaskTypeIcon";

import {parseids} from "../../../../utils/parseKeys";

const styles = {
  avatar: {
    margin: 2,
  },
  wrapper: {
    display: "flex",
    flexBasis: "100%",
    justifyContent: "flex-end"
  },
};

class GameCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {game, translate, onModifyPropGame, expanded} = this.props;

    const parameterEditorBuilder = new GameParameterEditorBuilder();

    return (
      <Card initiallyExpanded={expanded}
      >
        <CardHeader
          title={<span
            style={{color: game.valid ? "black" : "red"}}>{translate("common.model.games." + parseids(game.nameId))}</span>}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <div style={{display: "flex", flexDirection: "column"}}>
            {
              game.parameters.map(param =>
                parameterEditorBuilder.buildEditorForParameter(
                  param, game.parametersValues[param.id], onModifyPropGame
                )
              )
            }
          </div>
        </CardText>
        <CardText expandable={true}>
          <div style={{display: "flex"}}>
            <div style={{display: "flex"}}>
              <RaisedButton
                label="Eliminar"
                secondary={true}
                onClick={() => this.props.onDeleteGame()}
              />
            </div>

            <div style={styles.wrapper}>
              {game.tasks.map((key) => (
                <GameTaskTypeIcon key={key.id} taskType={key.id} style={styles.avatar} message={translate("common.model.games." + parseids(key.id))}/>
              ))}
            </div>
          </div>
        </CardText>
      </Card>
    );
  }
}

GameCard.propTypes = {
  game: PropTypes.object.isRequired,
  onDeleteGame: PropTypes.func,
  expanded: PropTypes.bool,
  translate: PropTypes.func,
  onModifyPropGame: PropTypes.func
};

export default translate(GameCard);
