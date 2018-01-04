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
/*
 *  Evaluates a valid object
 * */
const isValidObject = value => {
  if (!value) {
    return false;
  }

  const isArray = Array.isArray(value);
  const isBuffer = Buffer.isBuffer(value);
  const isObject =
    Object.prototype.toString.call(value) === "[object Object]";
  const hasKeys = !!Object.keys(value).length;

  return !isArray && !isBuffer && isObject && hasKeys;
};

/**
 * Plains a object with the different filters ej for filter therapist
 *
 * filterObject =
 * {
 *  id_institution : "something",
 *  personalData : {
 *      sex : "male"
 *  }
 * }
 *
 * BECOMES IN:
 *  {
 *      id_institution: "something"
 *      sex : "male"
 *  }
 *
 *  This enables for "stringify" method parse any structure of filters in to a plain query to API
 *
 *  ?......&id_institution=something&sex=male&.....
 */
const flattenObject = (value, path = []) => {
  if (isValidObject(value)) {
    return Object.assign(
      {},
      ...Object.keys(value).map(key =>
        flattenObject(value[key], path.concat([key]))
      )
    );
  } else {
    return path.length ? {[path.join(".")]: value} : value;
  }
};

export default flattenObject;
