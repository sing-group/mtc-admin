const separator = "#";
const origin = ".";

const parseids = (message) => {
  return message.replace(origin, separator)
};

const unparseids = (message) => {
  return message.replace(separator, origin)
};

export {
  parseids,
  unparseids
}