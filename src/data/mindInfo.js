import React, { Component } from 'react';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

import Avatar from 'material-ui/Avatar';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import UserIcon from 'material-ui/svg-icons/action/account-circle';

import { blue300, indigo900, green100, green500 } from 'material-ui/styles/colors';

import {messages} from '../i18n/'

//Must be synchronized with i18n messages
export const mindItems = {
    car1: {
        color: blue300,
        subColor: indigo900,
        icon: UserIcon
    },
    car2: {
        color: green100,
        subColor: green500,
        icon: NotificationsIcon
    },
};

export function buildIconTooltiped(style,mindElement,number,tooltip) {
    return (
        <IconButton style={{paddingLeft : 10, paddingRight : 0}} tooltip={tooltip}>
            <Avatar key={mindElement} style={style} size={25} color={mindItems[mindElement].subColor} backgroundColor={mindItems[mindElement].color}> {number} </Avatar>
        </IconButton>)
}

export function buildIcon(style, mindElement, number) {
    return <Avatar key={mindElement} style={style} size={20} color={mindItems[mindElement].subColor} backgroundColor={mindItems[mindElement].color}> {number} </Avatar>
}
