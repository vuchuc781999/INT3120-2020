import React from 'react';
import {Text} from 'react-native';

import PlatformTouchable from '../utils/touchable';
import {ScrollView} from 'react-native-gesture-handler';
const currentLesson = 2;
const currentLe = 2;

const LessonItem = (props) => {
  const {title, numQues, numTabs, curQues} = props;
  return (
    <PlatformTouchable rippleColor="rgba(0, 0, 0, .085)">
      <Text>{title}</Text>
      <Text>{}</Text>
    </PlatformTouchable>
  );
};

const LessonList = () => {
  return (
    <ScrollView>
      <LessonItem title="alkdfja" />
    </ScrollView>
  );
};

export default LessonList;
