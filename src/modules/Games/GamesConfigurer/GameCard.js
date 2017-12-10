import React, {Component} from 'react';
import {translate} from 'admin-on-rest'
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import {InputBuilder} from '../../../data/Games/Parameters'

import {buildIcon} from '../../../data/Games/taskTypes'
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
    super(props);
    this.state = {
      expanded: false
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded) {
      this.setState({expanded: nextProps.expanded})
    }
  }

  render() {
    const {game, translate, onModifyPropGame} = this.props;
    console.log("GAME CARD GAME", game, onModifyPropGame);
    return (
      <Card initiallyExpanded={this.state.expanded} onExpandChange={(expanded) => {
        this.state.expanded = expanded
      }} key={game}>
        <CardHeader
          title={<span
            style={{color: game.valid ? 'black' : 'red'}}>{translate("common.model.games." + parseids(game.nameId))}</span>}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          <div style={{display: 'flex', flexDirection: "column"}}>
            {
              game.parameters.map(param => {
                console.log("ESTABLECIENDO INPUT", param, param.id, game.parametersValues[param.id], game);
                return InputBuilder(game.parametersValues[param.id], param, onModifyPropGame)
              })
            }
          </div>
        </CardText>
        <CardText expandable={true}>
          <div style={{display: 'flex'}}>
            <div style={{display: 'flex'}}>
              <RaisedButton
                label="Eliminar"
                secondary={true}
                onTouchTap={() => this.props.onDeleteGame()}
              />
            </div>

            <div style={{display: "flex", flexBasis: '100%', justifyContent: 'flex-end'}}>
              {game.tasks.map((key, index) => (
                buildIcon(styles.avatar, key._id, translate("common.model.games." + parseids(key.id)))
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
  onDeleteGame: PropTypes.func
};

export default translate(GameCard);