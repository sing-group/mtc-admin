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
    Object.prototype.toString.call(value) === '[object Object]';
  const hasKeys = !!Object.keys(value).length;

  return !isArray && !isBuffer && isObject && hasKeys;
};

/**
 * Plains a object with the different filters ej for filter therapist
 *
 * filterObject =
 * {
 *  id_institution : "algo",
 *  personalData : {
 *      sex : "male"
 *  }
 * }
 *
 * BECOMES IN:
 *  {
 *      id_institution: "algo"
 *      sex : "male"
 *  }
 *
 *  This enables for 'stringify' method parse any structure of filters in to a plain query to API
 *
 *  ?......&id_institution=algo&sex=male&.....
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
    return path.length ? {[path.join('.')]: value} : value;
  }
};

export default flattenObject