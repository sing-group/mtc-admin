import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import { translate } from 'admin-on-rest'

import  Paper from 'material-ui/Paper'
import  RaisedButton  from 'material-ui/RaisedButton'
import MultiLanguageTextPicker from '../../../components/MultiLanguage'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

import { buildIconTooltiped } from '../../../data/taskTypes'


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

        console.log("PROPIEDADES ARRAY SELECT", props)
        
    }

    render() {
        const { translate } = this.props
        return (
            <div>
                <Card>
                    <CardTitle title={translate("aor.page.create",{name : translate("resources.posts.name",{smart_count : 1})})} />
                    <CardText>
                        <MultiLanguageTextPicker
                            translateRoute="resources.posts.fields.title"
                            pickerStyle={styles.picker} />
                        <MultiLanguageTextPicker
                            translateRoute="resources.posts.fields.content"
                            multiline={true}
                            rows={2}
                            pickerStyle={styles.picker} />
                    </CardText>

                </Card>
                <GameConfigurer  />
            </div>
        )
    }
})


