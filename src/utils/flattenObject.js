
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

/*
 *  Plains a object
 * */
const flattenObject = (value, path = []) => {
    if (isValidObject(value)) {
        return Object.assign(
            {},
            ...Object.keys(value).map(key =>
                flattenObject(value[key], path.concat([key]))
            )
        );
    } else {
        return path.length ? { [path.join('.')]: value } : value;
    }
};

export default flattenObject