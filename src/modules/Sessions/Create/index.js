import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import { translate } from 'admin-on-rest'

import  Paper from 'material-ui/Paper'
import  RaisedButton  from 'material-ui/RaisedButton'
import MultiLanguageTextPicker from '../../../components/MultiLanguage'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

import { buildIconTooltiped } from '../../../data/Games/taskTypes'


import { grey50 as bgColor } from 'material-ui/styles/colors';

import GameConfigurer from '../../Games/GamesConfigurer'

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
          };
        console.log("PROPIEDADES ARRAY SELECT", props)
        
    }

    handleExpandChange = (expanded) => {
        this.setState({expanded: expanded});
      };


    handleConfigurationEnd = (games) => {
        alert(JSON.stringify(games))
    }
    render() {
        const { translate } = this.props
        return (
            <div key="PRINCIPAL">
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
                    <CardTitle title={translate("aor.page.create",{name : translate("resources.session.name",{smart_count : 1})})} 
                    actAsExpander={true}
                    showExpandableButton={true}/>
                    <CardText expandable={true}>
                        <MultiLanguageTextPicker
                            translateRoute="resources.session.fields.title"/>
                        <MultiLanguageTextPicker
                            translateRoute="resources.session.fields.content"
                            multiLine={true}
                            rows={4} />
                    </CardText>

                </Card>
                <GameConfigurer  onConfigurationEnd={this.handleConfigurationEnd}/>
            </div>
        )
    }
})


