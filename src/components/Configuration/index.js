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
import { connect } from "react-redux";
import { Card, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import { translate, changeLocale as changeLocaleAction, ViewTitle } from "admin-on-rest";

import PropTypes from "prop-types";

import { changeTheme as changeThemeAction } from "./actions/changeTheme";

const styles = {
  label: { width: "10em", display: "inline-block" },
  button: { margin: "1em" },
};

const mapStateToProps = state => ({
  locale: state.locale
});

class Configuration extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {locale, changeTheme, changeLocale, translate} = this.props;

    return <Card>
      <ViewTitle title={translate("configuration.title")}/>
      <CardText>
        <div style={styles.label}>{translate("configuration.theme.name")}</div>
        <RaisedButton style={styles.button} label={translate("configuration.theme.light")} primary
                      onClick={() => changeTheme("light")}/>
        <RaisedButton style={styles.button} label={translate("configuration.theme.dark")} secondary
                      onClick={() => changeTheme("dark")}/>
      </CardText>
      <CardText>
        <div style={styles.label}>{translate("configuration.language")}</div>
        <RaisedButton style={styles.button} label="en" primary={locale === "en_US"} onClick={() => changeLocale("en_US")}/>
        <RaisedButton style={styles.button} label="es" primary={locale === "es_ES"} onClick={() => changeLocale("es_ES")}/>
        <RaisedButton style={styles.button} label="gl" primary={locale === "gl_ES"} onClick={() => changeLocale("gl_ES")}/>
      </CardText>
    </Card>;
  }
}

Configuration.propTypes = {
  locale: PropTypes.string,
  changeTheme: PropTypes.func,
  changeLocale: PropTypes.func,
  translate: PropTypes.func
};

export default connect(mapStateToProps, {
  changeLocale: changeLocaleAction,
  changeTheme: changeThemeAction,
})(translate(Configuration));
