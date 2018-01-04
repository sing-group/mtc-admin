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
import {EditButton, List, translate} from "admin-on-rest";
import {connect} from "react-redux";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import {grey50 as bgColor} from "material-ui/styles/colors";
import {buildIconTooltiped} from "../../../../data/games/taskTypes";
import {parseids} from "../../../../utils/parseKeys";
import {games as GamesMetadata} from "../../../../data/games/games";
import PropTypes from "prop-types";

const mapStateToProps = state => ({loginUser: state.login.loginUser});

const SessionsGrid = ({ids, data, basePath, translate, locale}) => (
  <div style={{
    margin: "1em",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "min-content"
  }}>
    {ids.map(id =>
      <Card key={id} style={{margin: 10, minWidth: 200, maxWidth: 200, height: "100%"}}>
        <CardHeader
          title={data[id].name.values.find(t => t.key === locale) ? data[id].name.values.find(t => t.key === locale).value : translate("session.noTranslation")}
          subtitle={data[id].description.values.find(t => t.key === locale) ? data[id].description.values.find(t => t.key === locale).value : translate("session.noTranslation")}>
        </CardHeader>
        <CardText style={{flexBasis: "100%"}}>
          {generateSummarySession(data[id].gameConfiguration.map(g => {
            const game = Object.keys(GamesMetadata).find(key => GamesMetadata[key].metadata._id === g.gameId);
            return GamesMetadata[game]
          }), translate)}
        </CardText>
        <CardActions style={{textAlign: "right", backgroundColor: "#eaeaea"}}>
          <EditButton resource="games-session" basePath={basePath} record={data[id]}/>
        </CardActions>
      </Card>
    )}
  </div>
);

SessionsGrid.propTypes = {
  ids: PropTypes.array,
  data: PropTypes.object,
  basePath: PropTypes.string,
  translate: PropTypes.func,
  locale: PropTypes.string
};

SessionsGrid.defaultProps = {
  data: {},
  ids: [],
};

export default connect(mapStateToProps)(
  translate((props) => (
    <div>
      <List {...props} filter={{loginUser: props.loginUser}}>
        {<SessionsGrid translate={props.translate} locale={props.locale}/>}
      </List>
    </div>
  ))
)

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

function generateSummarySession(games = [], translate) {
  const taskInfo = {};

  games.forEach((game) => {
    if (!game) return;
    game.metadata.taskTypes.forEach((taskElement) => {
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
