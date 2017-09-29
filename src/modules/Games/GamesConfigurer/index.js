import React, { Component } from 'react';

import { SortableContainer, SortableElement, arrayMove, a } from 'react-sortable-hoc';
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
import {parseids} from '../../../utils/parseKeys'

import { buildIconTooltiped } from '../../../data/taskTypes'
import { gameBuilder } from '../../../data/games'

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

const SortableItem = SortableElement(({ value , onDeleteGame}) =>
    <GameCard game={value} onDeleteGame={() => onDeleteGame()} />
);

const Container = SortableContainer(({ games, onDeleteGame }) =>
    <div>
        {games.map((game, index) => game && (
            <SortableItem key={game.sortableKey} index={index} value={game} onDeleteGame={() => onDeleteGame(index)}/>
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

    onGameRemove = (index) => {
        const games = this.state.games;
        games.splice(index, 1);

        this.setState({games : games})
    }

    onGamesAdded(games : string[]){
        this.setState({
            games : [
                ...this.state.games,
                ...games.map((key) => gameBuilder(key,{sortableKey : Math.random()}))
            ]
        })
    }

    render() {
        const { translate } = this.props
        return (
            <div style={{ backgroundColor: "#bfbfbf", display: 'flex', flexDirection: 'column' }}>
                <Toolbar >
                    <ToolbarGroup firstChild={true}>
                        <CardHeader title={translate("game.configurer.toolbar.options")} />
                    </ToolbarGroup>
                    <ToolbarGroup >
                        {generateSummarySession(this.state.games, translate)}
                        <FontIcon className="material-icons" >sort</FontIcon>
                    </ToolbarGroup>
                </Toolbar>
                <Container games={this.state.games} onSortEnd={this.onSortEnd} onDeleteGame={(index) => this.onGameRemove(index)} />
                <RaisedButton style={{ margin: 5 }} label={translate("session.create.addGame")} onTouchTap={() => this.setState({ open: true })} onClick={() => this.setState({ open: true })} />
                <GamePicker open={this.state.open} onRequestClose={() => this.setState({ open: false })} onGamesAdded={(games) => this.onGamesAdded(games)}/>
            </div>
        );
    }
}))


function generateSummarySession(games = [], translate) {
    console.log("GENERAR RESUMEN",games)
    const taskInfo = {}

    games.forEach((game) => {
        console.log("GAME", game)
        if (!game) return
        game.tasks.forEach((taskElement) => {
            if (!taskInfo[taskElement.id]) { taskInfo[taskElement.id] = 0 }
            taskInfo[taskElement.id] += 1//game.tasks[taskElement._id]
        })
    });
    return Object.keys(taskInfo).map((taskElement) => (
        buildIconTooltiped(styles.avatar, taskElement, taskInfo[taskElement], translate("common.model.games."+parseids(taskElement)))
    ))
}

