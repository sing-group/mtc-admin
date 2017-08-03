import React, { Component } from 'react';
import {translate} from 'admin-on-rest'
import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';

import { taskTypes, buildIcon } from '../../../data/taskTypes'
import {parseids} from '../../../utils/parseKeys'
const styles = {
    avatar: {
        margin: 2,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap'
    },
};

class GameCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.expanded){
            this.setState({expanded : nextProps.expanded})
        }
    }

    render() {
        const { game , translate} = this.props;
        return (
            <Card expanded={this.state.expanded} onExpandChange={(expanded) => { this.state.expanded = expanded}}>
                <CardHeader
                    title={translate("common.model.games."+parseids(game.id))}
                    actAsExpander={true}
                    showExpandableButton={true}
                    onExpandChange={(bool) => this.setState({expanded: bool})}
                />
                <CardText expandable={true}>
                    CONFIGURACION AQUI
                </CardText>
                <CardText expandable={true}>
                    <div style={styles.wrapper}>
                        <RaisedButton
                        label="Eliminar"
                        secondary={true}
                        onTouchTap={() => this.props.onDeleteGame()}
                        />
                        <div style={{display : "flex"}}>
                        {game.tasks.map((key, index) => (
                            buildIcon(styles.avatar, key._id,translate("common.model.games."+parseids(key.id)))
                        ))}
                        </div>
                    </div>
                </CardText>
            </Card>
        );
    }
}

GameCard.propTypes = {
    game: PropTypes.object.isRequired,
    onDeleteGame : PropTypes.func
};

export default translate(GameCard);