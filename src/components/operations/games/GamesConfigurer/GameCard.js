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

import {InputBuilder} from "../../../../data/games/parameters";

import {buildIcon} from "../../../../data/games/taskTypes";
import {parseids} from "../../../../utils/parseKeys";

const styles = {
  avatar: {
    margin: 2,
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap"
  },
};

class GameCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded) {
      this.setState({expanded: nextProps.expanded});
    }
  }

  setExpanded(expanded) {
    this.setState({expanded: expanded});
  }

  render() {
    const {game, translate, onModifyPropGame} = this.props;

    return (
      <Card key={game}
            initiallyExpanded={this.state.expanded}
            onExpandChange={(expanded) => this.setExpanded(expanded)}
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
              game.parameters.map(param => {
                return InputBuilder(game.parametersValues[param.id], param, onModifyPropGame)
              })
            }
          </div>
        </CardText>
        <CardText expandable={true}>
          <div style={{display: "flex"}}>
            <div style={{display: "flex"}}>
              <RaisedButton
                label="Eliminar"
                secondary={true}
                onTouchTap={() => this.props.onDeleteGame()}
              />
            </div>

            <div style={{display: "flex", flexBasis: "100%", justifyContent: "flex-end"}}>
              {game.tasks.map((key) => (
                buildIcon(styles.avatar, key._id, translate("common.model.games." + parseids(key.id)))
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
