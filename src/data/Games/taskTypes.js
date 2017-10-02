import React, { Component } from 'react';

import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';

import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import UserIcon from 'material-ui/svg-icons/action/account-circle';

import * as colors from 'material-ui/styles/colors';

import { messages } from '../../i18n/'

const GameTaskType = require("@sing-group/mtc-games/src/game/metadata/GameTaskType").default


console.log("colores cargados", colors)

/// PARA USAR CON COLORES 
const taskTypes =
    {
        "game.task.freeMemory":
        { "color": colors.indigo300, "subColor": colors.indigo900 },
        "game.task.recognition":
        { "color": colors.blue300, "subColor": colors.blue900 },
        "game.task.playbackHearing":
        { "color": colors.purple300, "subColor": colors.purple900 },
        "game.task.verbalFluency":
        { "color": colors.orange300, "subColor": colors.orange900 },
        "game.task.attentionalSpan":
        { "color": colors.cyan300, "subColor": colors.cyan900 },
        "game.task.centralExecutive":
        { "color": colors.green300, "subColor": colors.green900 },
        "game.task.calculus":
        { "color": colors.amber300, "subColor": colors.amber900 },
        "game.task.associatedPairs":
        { "color": colors.deepPurple300, "subColor": colors.deepPurple900 },
    }

console.log("TASK TYPES", JSON.stringify(taskTypes))
export { taskTypes }
//// ------

export function buildIconTooltiped(style, taskElement, number, tooltip) {
    console.log("CONSTRUYENDO ICONO", taskElement)
    return (
        <IconButton  key={taskElement+"Icon"} style={{ paddingLeft: 10, paddingRight: 0 }} tooltip={tooltip}>
            <Avatar key={taskElement} style={style} size={25} color={taskTypes[taskElement].subColor} backgroundColor={taskTypes[taskElement].color}> {number} </Avatar>
        </IconButton>)
}

export function buildIcon(style, taskElement, message = "") {
    return <Chip key={taskElement+"chip"}style={style} color={taskTypes[taskElement].subColor} backgroundColor={taskTypes[taskElement].color}>{message}</Chip>
}
/*
export function buildIcon(style, taskElement, message = "") {
    return <Avatar key={taskElement} style={style} size={20} color={taskTypes[taskElement].subColor} backgroundColor={taskTypes[taskElement].color}> {message}</Avatar>
}

export function buildIconTooltiped(style,taskElement,number,tooltip) {
    console.log("CONSTRUYENDO ICONO", taskElement)
    return (
        <IconButton style={{paddingLeft : 10, paddingRight : 0}} tooltip={tooltip}>
            <Avatar key={taskElement} style={style} size={25} color={taskTypes[taskElement].subColor} backgroundColor={taskTypes[taskElement].color}> {number} </Avatar>
        </IconButton>)
}

*/


