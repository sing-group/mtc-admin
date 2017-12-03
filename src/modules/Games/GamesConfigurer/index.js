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

import { buildIconTooltiped } from '../../../data/Games/taskTypes'
import { gameBuilder , gameAdapter } from '../../../data/Games/games'

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

const SortableItem = SortableElement(({ value , onDeleteGame, onModifyPropGame}) =>
    <GameCard onModifyPropGame={(p,v) => !console.log("AQUI2") && onModifyPropGame(p,v)} game={value} onDeleteGame={() => onDeleteGame()} />
);

const Container = SortableContainer(({ games, onDeleteGame, onModifyPropGame }) =>
    <div>
        {games.map((game, index) => game && (
            <SortableItem key={game.sortableKey} index={index} value={game} onDeleteGame={() => onDeleteGame(index)} onModifyPropGame={ (prop,newValue) => !console.log("AQUI1") && onModifyPropGame(index,prop,newValue)}/>
        ))}
    </div>
);

export default translate(class extends Component {

    constructor(props) {
        super(props);
        console.log("PROPIEDAES GAME", props)
        this.state = {
            open: false,
            games: props.games.map(g => gameAdapter(g))
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
        console.log("JUEGOS ", this.state.games)
        this.setState({
            games : [
                ...this.state.games,
                ...games.map((key) => gameBuilder(key,{sortableKey : Math.random()}))
            ]
        })
    }
    gameModified = (index, prop, newValue) => {

       this.state.games[index].parametersValues[prop] = newValue
        let valid = true
        this.state.games[index].parameters.forEach(param => {
            if (valid){
                valid = param.isValid(this.state.games[index].parametersValues[param.id])
            }
        })
        console.log("VALIDO", newValue, valid)
       this.state.games[index].valid = valid
       this.forceUpdate()
    }
    render() {
        const { translate , onConfigurationEnd } = this.props
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }} ><div style={{ backgroundColor: "#bfbfbf", display: 'flex', flexDirection: 'column' }}>
                <Toolbar >
                    <ToolbarGroup firstChild={true}>
                        <CardHeader title={translate("game.configurer.toolbar.options")} />
                    </ToolbarGroup>
                    <ToolbarGroup >
                        {generateSummarySession(this.state.games, translate)}
                        <FontIcon className="material-icons" >sort</FontIcon>
                    </ToolbarGroup>
                </Toolbar>
                <Container games={this.state.games} onSortEnd={this.onSortEnd} onDeleteGame={(index) => this.onGameRemove(index)} onModifyPropGame={this.gameModified}/>
                <RaisedButton style={{ margin: 5 }} label={translate("session.create.addGame")} onTouchTap={() => this.setState({ open: true })} onClick={() => this.setState({ open: true })} />
                <RaisedButton primary={true}  style={{ margin: 5 }} label={translate("session.create.endConfiguration")} onTouchTap={() => onConfigurationEnd(this.state.games)} onClick={() => onConfigurationEnd(this.state.games)} />
                <GamePicker open={this.state.open} onRequestClose={() => this.setState({ open: false })} onGamesAdded={(games) => this.onGamesAdded(games)}/>
            </div>
                </div>
        );
    }
})


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

