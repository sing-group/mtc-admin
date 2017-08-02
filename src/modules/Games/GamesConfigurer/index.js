import React, { Component } from 'react';

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import { translate } from 'admin-on-rest'

import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton'
import GameCard from './GameCard'
import MultiLanguageTextPicker from '../../../components/MultiLanguage'
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

import { buildIconTooltiped } from '../../../data/mindInfo'


import { grey50 as bgColor } from 'material-ui/styles/colors';

import GamePicker from '../../Games/PickerModalGame'

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

const SortableItem = SortableElement(({ value }) =>
    <GameCard game={value} />
);

const Container = SortableContainer(({ games }) =>
    <div>
        {games.map((game, index) => (
            <SortableItem key={game.title} index={index} value={game} />
        ))}
    </div>
);

export default translate(SortableContainer(class extends Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            games: [
                
            ]
        }
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            games: arrayMove(this.state.games, oldIndex, newIndex),
        });
    };

    onGameRemove = (game) => {

    }
    onGameAdded = (game) => {

    }
    render() {
        const { games } = this.state
        const { translate } = this.props
        return (
            <div style={{ backgroundColor: "#bfbfbf", display: 'flex', flexDirection: 'column' }}>
                <Toolbar >
                    <ToolbarGroup firstChild={true}>
                        <CardHeader title={translate("game.configurer.toolbar.options")} />
                    </ToolbarGroup>
                    <ToolbarGroup >
                        {generateSummarySession(games, translate)}
                        <FontIcon className="material-icons" >sort</FontIcon>
                    </ToolbarGroup>
                </Toolbar>
                <Container games={this.state.games} onSortEnd={this.onSortEnd} />
                <RaisedButton style={{ margin: 5 }} label={translate("session.create.addGame")} onTouchTap={() => this.setState({ open: true })} />
                <GamePicker open={this.state.open} onClose={() => this.setState({ open: false })} />
            </div>
        );
    }
}))


function generateSummarySession(games = [], translate) {
    const mindInfo = {}

    games.forEach((game) => {
        Object.keys(game.values).forEach((mindElement) => {
            if (!mindInfo[mindElement]) { mindInfo[mindElement] = 0 }
            mindInfo[mindElement] += game.values[mindElement]
        })
    });
    return Object.keys(mindInfo).map((mindElement) => (
        buildIconTooltiped(styles.avatar, mindElement, mindInfo[mindElement], translate("common.model.mindValues." + mindElement))
    ))
}

