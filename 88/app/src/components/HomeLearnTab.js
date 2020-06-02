import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import PlatformTouchable from '../utils/touchable';

import courseList from '../assets/data/courseList.json';
import {useSelector, shallowEqual, useDispatch} from 'react-redux';
import {changeNavIcon} from '../actions/ui';

const LearnItem = (props) => {
  const {iconName, title, progressUp, progressDown, status} = props;

  const dispatch = useDispatch();

  const itemPress = () => {
    dispatch(changeNavIcon(true));
  };

  return (
    <PlatformTouchable
      style={[styles.itemContainer]}
      rippleColor="rgba(0, 0, 0, .03)"
      rippleOverflow
      onPress={itemPress}>
      <View
        style={[
          styles.iconContainer,
          status === 'learned'
            ? styles.doneIconContainer
            : status === 'learning'
            ? styles.learningIconContainer
            : styles.notDoneIconContainer,
        ]}>
        <Icon
          name={iconName}
          style={
            status === 'learned' || status === 'learning'
              ? styles.icon
              : styles.notDoneIcon
          }
        />
      </View>
      <Text style={styles.title}>{title}</Text>
      {status === 'learned' || progressDown === 0 ? (
        <View style={styles.hiddenProgressContainer} />
      ) : (
        <View style={styles.progressContainer}>
          <Text style={styles.progressNumber}>
            {progressUp + '/' + progressDown}
          </Text>
          <View
            style={
              status === 'learned' || status === 'learning'
                ? styles.progressBar
                : styles.hiddenProgressBar
            }>
            <View
              style={[
                styles.progressFill,
                {flexGrow: progressUp / progressDown},
              ]}
            />
          </View>
        </View>
      )}
    </PlatformTouchable>
  );
};

const LearnTab = () => {
  const currentStatus = useSelector((state) => state.home, shallowEqual);

  const tempNode = [];
  let k = 0,
    space = false,
    learn = false;
  const renderedList = courseList.data.reduce((newArray, current, index) => {
    const {iconName, title, lessonsTotal} = current;
    if (tempNode && current.headStack) {
      newArray.push(
        <View
          key={index}
          style={[
            styles.rowContainer,
            space && tempNode.length > 1 && styles.rowSpace,
          ]}>
          {[...tempNode]}
        </View>,
      );
      space = tempNode.length > 1;
      tempNode.length = 0;
    }
    let status = '';
    if (currentStatus.course === index) {
      status = 'learning';
      learn = true;
    } else if (!learn) {
      status = 'learned';
    }
    tempNode.push(
      <LearnItem
        key={k++}
        courseIndex={index}
        iconName={iconName}
        title={title}
        progressUp={status === 'learning' ? currentStatus.lesson : 0}
        progressDown={lessonsTotal}
        status={status}
      />,
    );
    return newArray;
  }, []);

  if (tempNode) {
    renderedList.push(
      <View
        key={k++}
        style={[
          styles.rowContainer,
          space && tempNode.length > 1 && styles.rowSpace,
        ]}>
        {[...tempNode]}
      </View>,
    );
  }

  return (
    <ScrollView
      style={styles.mainContainer}
      contentContainerStyle={styles.contentContainer}>
      {[...renderedList]}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: '#f5f5f5',
    paddingTop: 7,
  },
  rowContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around',
  },
  rowSpace: {
    marginTop: 17,
  },
  itemContainer: {
    width: 155,
    paddingTop: 13,
    marginBottom: 13,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 73,
    height: 73,
    borderRadius: 50,
  },
  doneIconContainer: {
    backgroundColor: '#8bc34a',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  learningIconContainer: {
    backgroundColor: '#00bcd4',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  notDoneIconContainer: {
    backgroundColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  icon: {
    fontSize: 30,
    color: '#fff',
  },
  notDoneIcon: {
    fontSize: 30,
    color: '#9e9e9e',
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    color: '#757575',
    fontSize: 16,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiddenProgressContainer: {
    height: 15,
  },
  progressNumber: {
    fontSize: 11,
    color: '#757575',
    marginRight: 4,
  },
  progressBar: {
    flexDirection: 'row',
    flexGrow: 1,
    height: 4,
    backgroundColor: '#e0e0e0',
  },
  hiddenProgressBar: {
    display: 'none',
  },
  progressFill: {
    backgroundColor: '#00bcd4',
  },
});

export default LearnTab;
