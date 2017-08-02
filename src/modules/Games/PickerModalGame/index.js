import React from 'react';

import {parseids} from '../../../utils/parseKeys'

import { translate } from 'admin-on-rest'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import GamesMetadata from '../../../data/games'

const styles = {
  radioButton: {
    marginTop: 16,
  },
};

/**
 * Dialog content can be scrollable.
 */
export default translate(class GamePicker extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      open: props.open
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      open: nextProps.open
    })
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.props.onClose();
  };

  render() {
    const { translate } = this.props

    const actions = [
      <FlatButton
        label={translate('aor.action.cancel')}
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    console.log("DATOS JUEGOS", GamesMetadata)
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
          const metadata = GamesMetadata[key].metadata
          return (
            <div>
              {translate("common.model.games." + parseids(metadata._nameId))}
              {translate("common.model.games." + parseids(metadata._descriptionId))}
            </div>
          )
        })
        }
      </Dialog>
    );
  }
})