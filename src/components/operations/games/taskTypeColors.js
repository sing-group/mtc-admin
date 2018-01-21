/*
 * MultiTasking Cubes Administration
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Francisco Rojas Rodríguez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 * Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 * Carlos Spuch Calvar, and Tania Rivera Baltanás
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
import * as colors from 'material-ui/styles/colors';

import GameTaskType from '@sing-group/mtc-games/src/game/metadata/GameTaskType';

const taskTypeColors = {
  [GameTaskType.TYPES.FREE_MEMORY.id]:
    {backgroundColor: colors.indigo300, foregroundColor: colors.indigo900},
  [GameTaskType.TYPES.RECOGNITION.id]:
    {backgroundColor: colors.blue300, foregroundColor: colors.blue900},
  [GameTaskType.TYPES.PLAYBACK_HEARING.id]:
    {backgroundColor: colors.purple300, foregroundColor: colors.purple900},
  [GameTaskType.TYPES.VERBAL_FLUENCY.id]:
    {backgroundColor: colors.orange300, foregroundColor: colors.orange900},
  [GameTaskType.TYPES.ATTENTIONAL_SPAN.id]:
    {backgroundColor: colors.cyan300, foregroundColor: colors.cyan900},
  [GameTaskType.TYPES.CENTRAL_EXECUTIVE.id]:
    {backgroundColor: colors.green300, foregroundColor: colors.green900},
  [GameTaskType.TYPES.CALCULUS.id]:
    {backgroundColor: colors.amber300, foregroundColor: colors.amber900},
  [GameTaskType.TYPES.ASSOCIATED_PAIRS.id]:
    {backgroundColor: colors.deepPurple300, foregroundColor: colors.deepPurple900}
};

export default taskTypeColors;
