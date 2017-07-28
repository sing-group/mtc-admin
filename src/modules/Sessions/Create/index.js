import React, { Component } from 'react';

import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc';
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';

import { translate } from 'admin-on-rest'

import { Paper, card } from 'material-ui'
import GameCard from './GameCard'
import Toolbar from './Toolbar'

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

import { buildIconTooltiped } from '../../../data/mindInfo'


import { grey50 as bgColor } from 'material-ui/styles/colors';


const styles = {
    avatar: {
        backgroundColor: "red"
    },
    wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        backgroundColor: bgColor
    },
};

const SortableItem = SortableElement(({ value }) =>
    <GameCard game={value} />
);



const SortableList = translate(SortableContainer(({ games, translate }) => {
    return (
        <div style={{ backgroundColor: "#bfbfbf" }}>
            <Toolbar />
            {games.map((game, index) => (
                <SortableItem key={game.title} index={index} value={game} />
            ))}
        </div>
    );
}));

export default class extends Component {

    constructor(props) {
        super(props);

        console.log("PROPIEDADES ARRAY SELECT", props)
        this.state = {
            games: [
                {
                    title: "game1",
                    values: {
                        car1: 5,
                        car2: 3
                    }
                },
                {
                    title: "game2",
                    values: {
                        car1: 2
                    }
                },
                {
                    title: "game3",
                    values: {
                        car1: 1,
                        car2: 1
                    }
                }
            ]
        }
    }

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState({
            games: arrayMove(this.state.games, oldIndex, newIndex),
        });
    };

    render() {
        const { games } = this.state
        return (
            <div>
                <Paper>
                    <div style={styles.wrapper}>
                        {generateSummarySession(games, translate)}
                    </div>
                </Paper>
                <Card>
                    <CardTitle title="Card title" subtitle="Card subtitle" />
                    <CardText>
                        quam erat volutpat. Nulla facilisi.
                        Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                        Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                    </CardText>
                </Card>
                <SortableList games={this.state.games} onSortEnd={this.onSortEnd} />
            </div>
        )
    }
}


function generateSummarySession(games, translate) {
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