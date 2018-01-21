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
import {SupportedLocales} from "../../i18n/localesManager";
import TextField from "material-ui/TextField";

import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

import {Logos} from "../../i18n/logos";

let closeImg = {cursor: "pointer", float: "right", marginRight: "10px", width: "20px"};

class MultiLanguageTextPicker extends Component {
  constructor(props) {
    super(props);

    const propsNormal = Object.assign({}, props,
      {
        rows: 1,
        rowsMax: 1
      }
    );

    this.state = {
      props: props,
      configurations: {
        closed: propsNormal,
        mainTextProps: propsNormal,
      },
      currentLocale: props.locale,
      open: false,
      messages: props.messages ? props.messages : {}
    };

    let textArea = propsNormal;

    if (this.props.multiLine) {
      textArea = Object.assign({}, props,
        {
          multiLine: props.multiLine,
          rows: props.rows,
          rowsMax: props.rowsMax
        }
      );
    }

    this.changeToAreaMode = (l) => {
      if (l) {
        this.setState({
          configurations: Object.assign({}, this.state.configurations,
            {
              [l]: textArea
            }
          )
        });
      } else {
        this.setState({
          configurations: Object.assign({}, this.state.configurations,
            {
              mainTextProps: textArea
            }
          )
        });
      }
    };

    this.changeToNormalMode = (l) => {
      if (l) {
        this.setState({
          configurations: Object.assign({}, this.state.configurations,
            {
              [l]: propsNormal
            }
          )
        })
      } else {
        this.setState({
          configurations: Object.assign({}, this.state.configurations,
            {
              mainTextProps: propsNormal
            }
          )
        });
      }
    }
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }

  handleChange(...args) {
    const locale = args[1];
    const event = args[0];
    const currentLocale = locale ? locale : this.state.currentLocale;
    const messages = this.state.messages;
    this.props.onChangeValue(currentLocale, event.target.value);
    this.setState({
      messages: Object.assign({}, messages,
        {
          [currentLocale]: event.target.value
        }
      )
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({currentLocale: nextProps.locale});
  }

  render() {
    const {translate, translateRoute} = this.props;
    const mainTextProps = Object.assign({}, this.state.configurations.mainTextProps);

    delete mainTextProps.translateRoute;
    delete mainTextProps.translate;
    delete mainTextProps.locale;
    delete mainTextProps.messages;
    delete mainTextProps.onChangeValue;

    return (
      <div style={{display: "flex"}}>
        <TextField {...mainTextProps}
                   hintText={translate("common.multilanguagePicker", {language: translate("common.languages." + this.state.currentLocale)})}
                   style={{width: "100%"}}
                   value={(this.state.messages[this.state.currentLocale]) ? this.state.messages[this.state.currentLocale] : ""}
                   onChange={(e) => this.handleChange(e, this.state.currentLocale)}
                   floatingLabelText={translate(translateRoute)}
                   floatingLabelFixed={true}
                   floatingLabelStyle={{fontSize: 18}}
                   onFocus={(e) => {
                     this.changeToAreaMode();
                     e.target.focus();
                   }}
                   onBlur={() => this.changeToNormalMode()}
                   floatingLabelFocusStyle={{fontSize: 23}}
        />
        <div style={{marginTop: 25, alignSelf: "flex-start"}}>
          <FlatButton
            icon={
              <img src={Logos[this.state.currentLocale]}/>
            }
            onClick={() => this.handleOpen()}
          />
        </div>
        <Dialog
          title={
            <div>
              {translate(translateRoute)}
              <span style={closeImg}
                    onClick={() => this.handleClose()}>X</span>
            </div>
          }
          modal={true}
          open={this.state.open}
        >
          {
            SupportedLocales.map(l => {
              const configurations = this.state.configurations[l]
                ? this.state.configurations[l]
                : this.state.configurations.closed;

              const propsConfigurations = Object.assign({}, configurations);
              delete propsConfigurations.translate;
              delete propsConfigurations.translateRoute;
              delete propsConfigurations.onChangeValue;

              return <div style={{display: "flex"}} key={l}>
                <TextField
                  ref={l} {...propsConfigurations}
                  hintText={translate("common.multilanguagePicker", {language: translate("common.languages." + l)})}
                  style={{width: "100%"}}
                  value={(this.state.messages[l]) ? this.state.messages[l] : ""}
                  onChange={(e) => this.handleChange(e, l)}
                  floatingLabelStyle={{fontSize: 18}}
                  floatingLabelFocusStyle={{fontSize: 23}}
                  onFocus={() => this.changeToAreaMode(l)}
                  onBlur={() => this.changeToNormalMode(l)}
                />
                <div style={{alignSelf: "center", justifyContent: "flex-end", alignItems: "flex-end"}}>
                  <FlatButton
                    icon={
                      <img src={Logos[l]}/>
                    }
                    style={{justifyContent: "flex-end", alignItems: "flex-end"}}
                    disabled={true}
                  />
                </div>
              </div>;
            })
          }
        </Dialog>
      </div>
    );
  }
}

MultiLanguageTextPicker.propTypes = {
  translate: PropTypes.func,
  pickerStyle: PropTypes.object,
  locale: PropTypes.string,
  onChangeValue: PropTypes.func,
  messages: PropTypes.object,
  multiLine: PropTypes.bool,
  rows: PropTypes.number,
  rowsMax: PropTypes.number,
  translateRoute: PropTypes.string
};

export default translate(MultiLanguageTextPicker);
