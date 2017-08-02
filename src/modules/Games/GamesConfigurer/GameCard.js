import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import Badge from 'material-ui/Badge';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';

import { mindItems, buildIcon } from '../../../data/mindInfo'

const styles = {
    avatar: {
        margin: 2,
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
};

class GameCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            expanded: false
        }
    }

    render() {
        const { game } = this.props;
        return (
            <Card expanded={this.state.expanded} onExpandChange={(expanded) => { this.state.expanded = expanded}}>
                <CardHeader
                    title={game.title}
                    subtitle="Otros datos"
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    CONFIGURACION AQUI
                </CardText>
                <CardText expandable={true}>
                    <div style={styles.wrapper}>
                        <RaisedButton
                        label="Eliminar"
                        secondary={true}
                        onTouchTap={() => this.props.onDeleteGame(game)}
                        />
                        {Object.keys(game.values).map((key, index) => (
                            buildIcon(styles.avatar, key, game.values[key])
                        ))}
                        
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

export default GameCard;