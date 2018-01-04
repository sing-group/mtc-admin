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

import {translate} from "admin-on-rest";
import MultiLanguageTextPicker from "../../../MultiLanguage";

import GamesInput from "../../games/GamesConfigurer";

class SessionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: true,
      record: props.record ? props.record : {}
    };
  }

  handleExpandChange(expanded) {
    this.setState(Object.assign({}, this.state, {expanded: expanded}));
  }

  handleConfigurationEnd(games) {
    const record = Object.assign({}, this.state.record,
      {
        game: games.map((g, gameOrder) => {
          return {
            gameId: g.id,
            gameOrder: gameOrder + 1,
            parameter: g.parameters.map((p) => {
              return {
                key: p._id,
                value: g.parametersValues[p._id]
              }
            })
          }
        })
      }
    );

    this.props.save(record, this.props.redirect);
  }

  handleChange(prop, keyLocale, value) {
    const newRecord = {
      record: Object.assign({}, this.state.record, {
        [prop]: Object.assign({}, this.state.record[prop], {
          values: [
            ...(
              this.state.record[prop]
                ? this.state.record[prop]["values"].map(actualTranslation => {
                  return {
                    key: actualTranslation.key,
                    value: keyLocale === actualTranslation.key ? value : actualTranslation.value
                  }
                })
                : [
                  {
                    key: "es_ES",
                    value: keyLocale === "es_ES" ? value : ""
                  }, {
                    key: "en_US",
                    value: keyLocale === "en_US" ? value : ""
                  }, {
                    key: "gl_ES",
                    value: keyLocale === "gl_ES" ? value : ""
                  }
                ]
            )
          ]
        })
      })
    };

    this.setState(Object.assign({}, this.state, newRecord));
  }

  render() {
    const names = {};

    const descriptions = {};
    if (this.props.record.name) {
      this.props.record.name.values.forEach(t =>
        names[t.key] = t.value
      );
    }

    if (this.props.record.description) {
      this.props.record.description.values.forEach(t =>
        descriptions[t.key] = t.value
      );
    }

    return (
      <div key="PRINCIPAL">
        <div style={{marginLeft: 20}}>
          <MultiLanguageTextPicker
            messages={names}
            translateRoute="resources.games-session.fields.title"
            onChangeValue={(k, v) => this.handleChange("name", k, v)}/>
          <MultiLanguageTextPicker
            translateRoute="resources.games-session.fields.content"
            messages={descriptions}
            multiLine={true}
            rows={4}
            onChangeValue={(k, v) => this.handleChange("description", k, v)}/>
        </div>
        <GamesInput games={this.props.record.gameConfiguration ? this.props.record.gameConfiguration : []}
                    onConfigurationEnd={(games) => this.handleConfigurationEnd(games)}/>
      </div>
    )
  }
}

SessionForm.propTypes = {
  translate: PropTypes.func,
  record: PropTypes.object,
  save: PropTypes.func,
  redirect: PropTypes.string
};


export default translate(SessionForm);


