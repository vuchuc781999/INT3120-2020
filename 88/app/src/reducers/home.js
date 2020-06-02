import {
  CHANGE_HOME_TAB,
  CHANGE_CURRENT_LESSON,
  CHANGE_HOME_SCREEN,
} from '../constants/actionTypes';
const initialState = {
  tab: 0,
  course: 2,
  lesson: 5,
  screen: 'courses list ',
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_HOME_TAB:
      return {
        ...state,
        tab: action.payload,
      };
    case CHANGE_CURRENT_LESSON:
      return {
        ...state,
        ...action.payload,
      };
    case CHANGE_HOME_SCREEN:
      return {
        ...state,
        screen: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
