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
import {
  DateField,
  Show,
  ReferenceField,
  TextField,
  SimpleShowLayout,
  ReferenceManyField,
  Datagrid,
  translate
} from "admin-on-rest";
import PropTypes from "prop-types";
import {parseids} from '../../../../utils/parseKeys';


const ResultsDataGrid = translate((props) => {
  const dateLocale = props.translate("common.dateLocales");

  const results = Object.keys(props.data)
    .map(key => props.data[key]);

  const resultFields = results
    .map(result => result.resultFields)
    .reduce((f1, f2) => f1.concat(f2), []);

  const fields = Array.from(new Set(resultFields));

  results.forEach(result => {
    result.game = props.translate("common.model.games." + parseids("game." + result.game + ".name"));

    fields.forEach(field => {
      if (result[field] && (result[field] === "true" || result[field === "false"])) {
        result[field] = props.translate("common." + result[field]);
      }
    })
  });

  return <Datagrid {...props}>
    <TextField source="gameIndex"/>
    <TextField source="game"/>
    <TextField source="attempt"/>
    <DateField source="startDate" locales={dateLocale} showTime/>
    <DateField source="endDate" locales={dateLocale} showTime/>
    {fields.map(header =>
      <TextField key={header} source={header}/>
    )}
  </Datagrid>;
});

const ResultsField = (props) => {
  return <ReferenceManyField
    {...props}
    label="Results"
    reference="game-result"
    target="assigned-session"
    perPage={10}
    sort={{ field: 'gameConfiguration.gameOrder', order: 'ASC' }}
  >
    <ResultsDataGrid/>
  </ReferenceManyField>;
};

class AssignedSessionShow extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dateLocale = this.props.translate("common.dateLocales");

    return <Show {...this.props} >
      <SimpleShowLayout>
        <TextField source="patient"/>
        <ReferenceField
          source="assignedGamesSessions"
          reference="games-session">
          <TextField source={"name" + this.props.locale}/>
        </ReferenceField>
        <DateField source="startDate" locales={dateLocale}/>
        <DateField source="endDate" locales={dateLocale}/>
        <ResultsField/>
      </SimpleShowLayout>
    </Show>;
  }
}

AssignedSessionShow.propTypes = {
  translate: PropTypes.func,
  locale: PropTypes.string
};

export default translate(AssignedSessionShow);
