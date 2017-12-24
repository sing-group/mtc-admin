export default class UnsupportedRequestAdapter {
  adapt() {
    throw new Error("Unsupported operation");
  }
}