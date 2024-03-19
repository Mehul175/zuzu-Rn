// Libraries import
import {View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

// Local import
import {videoData} from '../../../api/constant';
import ReelsComponent from './ReelsComponent';

export default function Home({navigation}) {
  const colors = useSelector(state => state.theme.theme);

  return (
    <View
      style={{
        backgroundColor: colors.backgroundColor,
      }}>
      <ReelsComponent reelData={videoData} navigation={navigation} />
    </View>
  );
}
