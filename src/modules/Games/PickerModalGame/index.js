import React from 'react';

import {parseids} from '../../../utils/parseKeys'

import {translate} from 'admin-on-rest'
import PropTypes from 'prop-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import {games as GamesMetadata} from '../../../data/Games/games'

const styles = {
  radioButton: {
    marginTop: 16,
  },
  cardSelected: {
    marginTop: 10,
    boxShadow: "0px 0px 5px 5px #B3E5FC"
  },
  cardUnSelected: {
    marginTop: 10
  }
};

/**
 * Dialog content can be scrollable.
 */
class GamePicker extends React.Component {

  handleOpen = () => {
    this.setState({open: true});
  };
  handleClose = () => {
    this.setState({open: false, gamesSelected: [], actual: undefined});
    this.props.onRequestClose();
  };

  constructor(props) {
    super(props);

    this.state = {
      gamesSelected: [],
      open: props.open,
      actual: undefined
    }

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    })
  }

  handleCursorInGame(key) {
    this.setState({actual: key})
  }

  handleClickOnGame(key) {
    const index = this.state.gamesSelected.lastIndexOf(key);
    let aux = this.state.gamesSelected;
    if (index < 0) {
      aux.push(key)
    } else {
      aux.splice(index, 1)
    }

    this.setState({gamesSelected: aux})
  }

  onConfirmGames() {
    this.props.onGamesAdded(this.state.gamesSelected);
    this.handleClose();
  }

  getStyle(key) {
    return this.state.gamesSelected.lastIndexOf(key) < 0 ? styles.cardUnSelected : styles.cardSelected
  }

  render() {
    const {translate} = this.props;

    const actions = [
      <FlatButton
        label={translate('aor.action.cancel')}
        primary={true}
        onTouchTap={this.handleClose}
        onClick={this.handleClose}
      />,
      <FlatButton
        label={translate('game.picker.addGames')}
        primary={true}
        disabled={this.state.gamesSelected.length == 0}
        onTouchTap={() => this.onConfirmGames()}
        onClick={() => this.onConfirmGames()}
      />
    ];
    return (
      <Dialog
        title={translate('game.picker.title')}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        autoScrollBodyContent={true}
      >
        {Object.keys(GamesMetadata).map((key) => {
          const metadata = GamesMetadata[key].metadata;
          return (
            <Card style={this.getStyle(key)} key={key}
                  onMouseEnter={() => this.handleCursorInGame(key)}
                  onClick={() => this.handleClickOnGame(key)}
                  onTouchTap={() => this.handleClickOnGame(key)}
                  zDepth={(this.state.actual == key) ? 3 : 1}>
              <CardHeader
                title={translate("common.model.games." + parseids(metadata._nameId))}
              />
              <CardText>
                {translate("common.model.games." + parseids(metadata._descriptionId))}
              </CardText>
            </Card>
          )
        })
        }
      </Dialog>
    );
  }
}

GamePicker.propTypes = {
  onGamesAdded: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default translate(GamePicker)