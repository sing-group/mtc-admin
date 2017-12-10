import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {translate} from 'admin-on-rest';
import {SupportedLocales} from '../../i18n/localesManager';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import {Logos} from '../../i18n/logos';

const styles = {
  floatingLabelStyle: {},
  floatingLabelFocusStyle: {
    fontWeight: 'bold'
  }
};

let closeImg = {cursor: 'pointer', float: 'right', marginRight: "10px", width: '20px'};

class MultiLanguageTextPicker extends Component {
  constructor(props) {
    super(props);

    const propsNormal = {
      ...props,
      //multiLine : false,
      rows: 1,//undefined,
      rowsMax: 1//undefined
    };

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
      textArea = {
        ...props,
        multiLine: props.multiLine,
        rows: props.rows,
        rowsMax: props.rowsMax
      }
    }

    this.changeToAreaMode = (l) => {
      if (l) {
        this.setState({
          configurations: {
            ...this.state.configurations,
            [l]: textArea
          }
        })
      } else {
        this.setState({
          configurations: {
            ...this.state.configurations,
            mainTextProps: textArea
          }
        })
      }
    };

    this.changeToNormalMode = (l) => {
      if (l) {
        this.setState({
          configurations: {
            ...this.state.configurations,
            [l]: propsNormal
          }
        })
      } else {
        this.setState({
          configurations: {
            ...this.state.configurations,
            mainTextProps: propsNormal
          }
        })
      }
    }
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose() {
    this.setState({open: false});
  };

  handleChange(...args) {
    const locale = args[1];
    const event = args[0];
    const currentLocale = locale ? locale : this.state.currentLocale;
    const messages = this.state.messages;
    this.props.onChangeValue(currentLocale, event.target.value);
    this.setState({
      messages: {
        ...messages,
        [currentLocale]: event.target.value
      }
    });
  };

  componentWillReceiveProps(nextProps) {
    this.setState({currentLocale: nextProps.locale});
  }

  render() {
    const locales = SupportedLocales;
    const {locale, translate, pickerStyle, translateRoute} = this.props;
    const mainTextProps = this.state.configurations.mainTextProps;

    delete mainTextProps.translateRoute;
    delete mainTextProps.translate;
    delete mainTextProps.locale;
    return (
      <div style={{display: "flex"}}>
        <TextField ref="main" {...mainTextProps}
                   hintText={translate("common.multilanguagePicker", {language: translate("common.languages." + this.state.currentLocale)})}
                   style={{width: '100%'}}
                   value={(this.state.messages[this.state.currentLocale]) ? this.state.messages[this.state.currentLocale] : ""}
                   onChange={(e) => this.handleChange(e, this.state.currentLocale)}
                   floatingLabelText={translate(translateRoute)}
                   floatingLabelFixed={true}
                   floatingLabelStyle={{fontSize: 18}}
                   onFocus={(e) => {
                     this.changeToAreaMode();
                     e.target.focus()
                   }}
                   onBlur={(e) => this.changeToNormalMode()}
                   floatingLabelFocusStyle={{fontSize: 23}}
        />
        <div style={{marginTop: 25, alignSelf: "flex-start"}}>
          <FlatButton
            icon={
              <img src={Logos[this.state.currentLocale]}/>
            }
            onClick={() => !console.log("HOLA") && this.handleOpen()}
            onTouchTap={() => !console.log("HOLA") && this.handleOpen()}
          />
        </div>
        <Dialog
          title={
            <div>
              {translate(translateRoute)}
              <span style={closeImg}
                    onClick={this.handleClose} onTouchTap={this.handleClose}>X</span>
            </div>
          }
          modal={true}
          open={this.state.open}
        >
          {
            SupportedLocales.map(l => <div style={{display: "flex"}} key={l}>
                <TextField
                  ref={l} {...(this.state.configurations[l]) ? this.state.configurations[l] : this.state.configurations.closed}
                  hintText={translate("common.multilanguagePicker", {language: translate("common.languages." + l)})}
                  style={{width: '100%'}} value={(this.state.messages[l]) ? this.state.messages[l] : ""}
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
              </div>
            )
          }
        </Dialog>

      </div>
    );
  }
}

MultiLanguageTextPicker.PropTypes = {
  translate: PropTypes.func,
  pickerStyle: PropTypes.object
};

export default translate(MultiLanguageTextPicker);
