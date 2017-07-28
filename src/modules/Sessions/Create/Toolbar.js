import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar';
import {CardHeader} from 'material-ui/Card';


import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';


export default class ToolbarExamplesSimple extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 3,
        };
    }

    handleChange = (event, index, value) => this.setState({ value });

    render() {
        return (
                <Toolbar >
                    <ToolbarGroup firstChild={true}>
                        <CardHeader title="Opciones"/>
                    </ToolbarGroup>
                    <ToolbarGroup >
                        <FontIcon className="material-icons" >sort</FontIcon>
                    </ToolbarGroup>
                </Toolbar>
        );
    }
}