import React, {Component} from 'react';
import {translate} from 'admin-on-rest'
import PropTypes from 'prop-types';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

import {InputBuilder} from '../../../data/Games/Parameters';

import {buildIcon} from '../../../data/Games/taskTypes';
import {parseids} from '../../../utils/parseKeys';

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

  setExpanded(expanded) {
    this.setState({expanded: expanded});
  }

  render() {
    const {game, translate, onModifyPropGame} = this.props;

    return (
      <Card key={game}
            initiallyExpanded={this.state.expanded}
            onExpandChange={(expanded) => this.setExpanded(expanded)}
      >
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
              {game.tasks.map((key) => (
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
  onDeleteGame: PropTypes.func,
  expanded: PropTypes.boolean,
  translate: PropTypes.func,
  onModifyPropGame: PropTypes.func
};

export default translate(GameCard);