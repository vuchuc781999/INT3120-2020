import {
  CHANGE_HOME_TAB,
  CHANGE_CURRENT_LESSON,
  CHANGE_HOME_SCREEN,
} from '../constants/actionTypes';

import courseList from '../assets/data/courseList.json';

/**
 * Change tab to index
 * @param index {number} - tab's index
 */
export const changeTab = (index) => {
  return {
    type: CHANGE_HOME_TAB,
    payload: index,
  };
};

export const changeCurrentLesson = (course, lesson) => {
  let fixedCourse = 0,
    fixedLesson = 0;

  if (fixedLesson >= 0 && fixedCourse >= 0) {
    if (lesson > courseList.data[course]) {
      fixedCourse = course + 1;
    } else {
      fixedCourse = course;
      fixedLesson = lesson;
    }
  }

  return {
    type: CHANGE_CURRENT_LESSON,
    payload: {
      course: fixedCourse,
      lesson: fixedLesson,
    },
  };
};

export const goToScreen = (screen) => {
  return {
    type: CHANGE_HOME_SCREEN,
    payload: screen,
  };
};
