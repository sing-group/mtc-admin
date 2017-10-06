import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import { translate } from 'admin-on-rest'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import MultiLanguageTextPicker from '../../../components/MultiLanguage'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

import { buildIconTooltiped } from '../../../data/Games/taskTypes'


import { CREATE, Create } from 'admin-on-rest';

import { grey50 as bgColor } from 'material-ui/styles/colors';

import GamesInput from '../../Games/GamesConfigurer'

const styles = {
    avatar: {
        backgroundColor: "red"
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: bgColor
    },
    picker: {
        display: 'flex',
    }
};

export default translate(class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            record: {}
        };
        console.log("PROPIEDADES ARRAY SELECT", props)

    }

    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };


    handleConfigurationEnd = (games) => {
        console.log(games)
        const record = {
            ...this.state.record,
            game: games.map((g, gameOrder) => {
                return {
                    gameId: g.id,
                    gameOrder: gameOrder +1 ,
                    parameter: g.parameters.map((p) => {
                        return {
                            key: p._id,
                            value: g.parametersValues[p._id]
                        }
                    })
                }

            })
        }

        console.log("DATOS", record)
        this.props.save(record, this.props.redirect)
    }

    handleChange = (prop, keyLocale, value) => {
        this.setState({
            record: {
                ...this.state.record,
                [prop]: {
                    ...this.state.record[prop],
                    values: [
                        ...(this.state.record[prop] ? this.state.record[prop]["values"].map( actualTranslation => {
                            return {
                                key: actualTranslation.key,
                                value: keyLocale === actualTranslation.key ? value : actualTranslation.value
                            }
                        }) : [{
                            key: "es_ES",
                            value : keyLocale === "es_ES" ? value : ""
                        },{
                            key: "en_US",
                            value : keyLocale === "en_US" ? value : ""
                        },{
                            key: "gl_ES",
                            value : keyLocale === "gl_ES" ? value : ""
                        },])
                    ]
                }
            }
        })
    }
    render() {
        const { translate } = this.props
        console.log("Propiedades recibidas el formulario", this.props)
        return (
            <div key="PRINCIPAL">
                <div style={{ marginLeft: 20 }}>
                    <MultiLanguageTextPicker
                        translateRoute="resources.session.fields.title"
                        onChangeValue={(k, v) => this.handleChange("name", k, v)} />
                    <MultiLanguageTextPicker
                        translateRoute="resources.session.fields.content"
                        multiLine={true}
                        rows={4}
                        onChangeValue={(k, v) => this.handleChange("description", k, v)} />

                </div>
                <GamesInput onConfigurationEnd={this.handleConfigurationEnd} />
            </div>
        )
    }
})


