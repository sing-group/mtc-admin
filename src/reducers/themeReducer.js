import {CHANGE_THEME} from "../components/Configuration/actions/changeTheme";

export default (previousState = 'light', { type, payload }) => {
  if (type === CHANGE_THEME) {
    console.log(payload);
    return payload;
  } else {
    return previousState;
  }
};