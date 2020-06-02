import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import {useSelector, useDispatch} from 'react-redux';

import LearnTab from './HomeLearnTab';
import {changeTab} from '../actions/home';
import PlatformTouchable from '../utils/touchable';
import LessonList from './HomeLessionList';

const renderTabBar = (props) => {
  return (
    <TabBar
      {...props}
      style={styles.tabBar}
      indicatorStyle={styles.indicatorStyle}
    />
  );
};

const PlayTab = () => {
  return (
    <View
      style={[styles.scene, {justifyContent: 'center', alignItems: 'center'}]}>
      <Text style={{color: '#757575', fontSize: 20, marginVertical: 5}}>
        Play Section Moved
      </Text>
      <Text style={{color: '#757575', fontSize: 12}}>
        Challenge peers, gain XP, and get better in our free all-in-one app!
      </Text>
      <PlatformTouchable
        rippleColor="rgba(0, 0, 0, .03)"
        style={{
          backgroundColor: '#8bc34a',
          width: 250,
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Text style={{marginVertical: 10, color: '#fff'}}>INSTALL APP</Text>
      </PlatformTouchable>
    </View>
  );
};

const initialLayout = {
  width: Dimensions.get('window').width,
};

const HomeTabView = () => {
  //const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'learn', title: 'LEARN'},
    {key: 'play', title: 'PLAY'},
  ]);

  const index = useSelector((state) => state.home.tab);
  const screen = useSelector((state) => state.home.screen);

  const dispatch = useDispatch();
  const setIndex = (i) => {
    dispatch(changeTab(i));
  };

  const renderScene = SceneMap({
    learn: screen === 'courses list' ? LearnTab : LessonList,
    play: PlayTab,
  });

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    backgroundColor: '#00bcd4',
    elevation: 0,
  },
  indicatorStyle: {
    backgroundColor: '#fff',
  },
});

export default HomeTabView;
