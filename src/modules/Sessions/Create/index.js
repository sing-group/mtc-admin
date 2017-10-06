import React, { Component } from 'react';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import { translate } from 'admin-on-rest'

import  Paper from 'material-ui/Paper'
import  RaisedButton  from 'material-ui/RaisedButton'
import MultiLanguageTextPicker from '../../../components/MultiLanguage'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

import { buildIconTooltiped } from '../../../data/Games/taskTypes'


import { CREATE , Create} from 'admin-on-rest';

import { grey50 as bgColor } from 'material-ui/styles/colors';

import SessionForm from '../Forms'

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

    render() {
        const { translate } = this.props
        return (
            <Create {...this.props}>
                <SessionForm />
            </Create>
        )
    }
})


