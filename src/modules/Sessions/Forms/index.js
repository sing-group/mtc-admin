import React, {Component} from 'react';
import {Card, CardHeader, CardText, CardTitle} from 'material-ui/Card';

import {CREATE, Create, translate} from 'admin-on-rest'
import MultiLanguageTextPicker from '../../../components/MultiLanguage'

import {grey50 as bgColor} from 'material-ui/styles/colors';

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

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };
  handleConfigurationEnd = (games) => {
    console.log(games);
    const record = {
      ...this.state.record,
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
    };

    console.log("DATOS", record);
    this.props.save(record, this.props.redirect)
  };
  handleChange = (prop, keyLocale, value) => {
    this.setState({
      record: {
        ...this.state.record,
        [prop]: {
          ...this.state.record[prop],
          values: [
            ...(this.state.record[prop] ? this.state.record[prop]["values"].map(actualTranslation => {
              return {
                key: actualTranslation.key,
                value: keyLocale === actualTranslation.key ? value : actualTranslation.value
              }
            }) : [{
              key: "es_ES",
              value: keyLocale === "es_ES" ? value : ""
            }, {
              key: "en_US",
              value: keyLocale === "en_US" ? value : ""
            }, {
              key: "gl_ES",
              value: keyLocale === "gl_ES" ? value : ""
            },])
          ]
        }
      }
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      expanded: true,
      record: props.record ? props.record : {}
    };
    console.log("PROPIEDADES ARRAY SELECT", props)

  }

  render() {
    const {translate} = this.props;
    console.log("Propiedades recibidas el formulario", this.props);
    const names = {};

    const descriptions = {};
    if (this.props.record.name) {
      this.props.record.name.values.forEach(t => {
        names[t.key] = t.value
      });
    }
    if (this.props.record.description) {

      this.props.record.description.values.forEach(t => {
        descriptions[t.key] = t.value
      });
    }
    return (
      <div key="PRINCIPAL">
        <div style={{marginLeft: 20}}>
          <MultiLanguageTextPicker
            messages={names}
            translateRoute="resources.session.fields.title"
            onChangeValue={(k, v) => this.handleChange("name", k, v)}/>
          <MultiLanguageTextPicker
            translateRoute="resources.session.fields.content"
            messages={descriptions}
            multiLine={true}
            rows={4}
            onChangeValue={(k, v) => this.handleChange("description", k, v)}/>

        </div>
        <GamesInput games={this.props.record.gameConfiguration ? this.props.record.gameConfiguration : []}
                    onConfigurationEnd={this.handleConfigurationEnd}/>
      </div>
    )
  }
})


