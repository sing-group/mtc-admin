import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { translate } from 'admin-on-rest';
import { SupportedLocales } from '../../i18n/localesManager'
import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import Paper from 'material-ui/Paper';
import DashBoard from '../Dashboard/index'

import { Logos } from '../../i18n/logos';
import messages from '../../i18n'
import ObjectByString from '../../utils/objectByString'

const styles = {
    floatingLabelStyle : {

    },
    floatingLabelFocusStyle : {
        fontWeigth : 'bold'
    }
}

class MultiLanguajeTextPicker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLocale: props.locale,
            messages : {}
        }
    }

    handleChange = (event) => {
        const currentLocale = this.state.currentLocale;
        const messages = this.state.messages
        this.setState({
            messages : {
                ...messages,
                [currentLocale] : event.target.value
            }
        });
    };

    render() {
        const locales = SupportedLocales
        const { locale, translate, pickerStyle, translateRoute } = this.props
        console.log("ESTADO COMPONENTE", this.state)
        return (
            <div style={pickerStyle}>
                <TextField {...this.props} hintText={translate("common.multilanguagePicker",{idioma : translate("common.languages."+this.state.currentLocale)})} style={{width: '100%'}} value={(this.state.messages[this.state.currentLocale])? this.state.messages[this.state.currentLocale]: ""} onChange={this.handleChange} 
                        floatingLabelText={translate(translateRoute)}
                        floatingLabelFixed={true}
                        floatingLabelStyle={{ fontSize : 18}}
                        floatingLabelFocusStyle={{ fontSize : 25}}
                        />
                <IconMenu 
                    iconButtonElement={
                        <img style={{marginTop : 15}} src={Logos[this.state.currentLocale]} />
                    }
                >
                    { 
                        SupportedLocales.map( l => 
                            <MenuItem primaryText={translate("common.languages."+l)} leftIcon={ <img src={Logos[l]}/> } 
                            onTouchTap={ () => {this.setState({currentLocale : l}) }}/> 
                        ) 
                    }
                </IconMenu>
                
            </div>
        )

    }
}

MultiLanguajeTextPicker.PropTypes = {
    translate: PropTypes.func,
    pickerStyle: PropTypes.object
}

export default translate(MultiLanguajeTextPicker)
