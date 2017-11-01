import React from 'react';
import { List, TextField, EditButton } from 'admin-on-rest';
import { connect } from 'react-redux';
import { Card, CardText, CardActions, CardHeader } from 'material-ui/Card';

import { translate } from 'admin-on-rest';
import { grey50 as bgColor } from 'material-ui/styles/colors';
import { buildIconTooltiped } from '../../../data/Games/taskTypes'
import {parseids} from '../../../utils/parseKeys'
import {games as GamesMetadata} from '../../../data/Games/games'
const sessionStyle = {
    margin: '0.5em',
    display: 'inline-block',
    verticalAlign: 'top'
};

const mapStateToProps = state => ({ loginUser: state.login.loginUser })

const SessionsGrid =({ ids, data, basePath, translate, locale }) => (
    !console.log("DATOS SESIONES",ids, data, locale) 
    && <div style={{ margin: '1em', display: "flex", flexWrap: "wrap", justifyContent : "center", alignItems: "center" , height:"min-content" }}>
        {ids.map(id => 
            <Card key={id} style={{  margin : 10, minWidth : 200, maxWidth : 200 , height: "100%"}} >
                <CardHeader
                    title={data[id].name.values.find( t => t.key === locale).value }
                    subtitle={data[id].description.values.find( t => t.key === locale).value }>
                
                </CardHeader>
                <CardText style={{flexBasis: "100%"}}>
                {generateSummarySession(data[id].gameConfiguration.map(g =>{
                    const game = Object.keys(GamesMetadata).find( key => GamesMetadata[key].metadata._id === g.gameId)
                    return GamesMetadata[game]
                }) , translate)}
                    </CardText>
                <CardActions style={{ textAlign: 'right', backgroundColor: "#eaeaea"}}>
                
                <EditButton resource="session" basePath={basePath} record={data[id]} />
            </CardActions>
            </Card>
        )}
    </div>
);
SessionsGrid.defaultProps = {
    data: {},
    ids: [],
};

export default connect(mapStateToProps)(
    translate((props) => (
    <div>
        <List {...props} filter={{ loginUser: props.loginUser }}>
            { <SessionsGrid translate={props.translate} locale={props.locale}/>}
        </List>
    </div>
))
)


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

function generateSummarySession(games = [], translate) {
    console.log("GENERAR RESUMEN",games)
    const taskInfo = {}

    games.forEach((game) => {
        console.log("GAME", game)
        if (!game) return
        game.metadata.taskTypes.forEach((taskElement) => {
            if (!taskInfo[taskElement.id]) { taskInfo[taskElement.id] = 0 }
            taskInfo[taskElement.id] += 1//game.tasks[taskElement._id]
        })
    });
    return Object.keys(taskInfo).map((taskElement) => (
        buildIconTooltiped(styles.avatar, taskElement, taskInfo[taskElement], translate("common.model.games."+parseids(taskElement)))
    ))
}
