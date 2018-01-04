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

import {
  ChipField,
  Datagrid,
  EditButton,
  List,
  ReferenceManyField,
  ShowButton,
  SingleFieldList,
  TextField,
  translate
} from "admin-on-rest";

class ManagerList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {translate} = this.props;

    return <List {...this.props}>
      <Datagrid>
        <TextField source="login"/>
        <TextField source="name"/>
        <TextField source="surname"/>
        <TextField source="email"/>
        <ReferenceManyField
          label={translate("resources.manager.references.institutionsList")}
          reference="institution"
          target="manager"
        >
          <SingleFieldList>
            <ChipField source="name"/>
          </SingleFieldList>
        </ReferenceManyField>
        <EditButton/>
        <ShowButton/>
      </Datagrid>
    </List>;
  }
}

ManagerList.propTypes = {
  translate: PropTypes.func
};

export default translate(ManagerList);
