// Library Imports
import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import Swiper from 'react-native-swiper';
import {useSelector} from 'react-redux';

//Local Imports
import ZText from '../components/common/ZText';
import images from '../assets/images';
import {styles} from '../themes';
import {
  APP_OPEN_FIRST_TIME,
  getHeight,
  moderateScale,
} from '../common/constants';
import {StackNav} from '../navigation/NavigationKeys';
import {setAsyncStorageData} from '../utils/helpers';
import ZButton from '../components/common/ZButton';

const OnBoarding = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);

  const OnBoardingData = {
    tutorialText1: {
      id: 1,
      title: 'Watch interesting videos from around the world',
      image: images.onBoardingLight1,
      desc: 'The best streaming anime app of the century to entertain you every day',
      btnTitle: 'Next',
      onPress: () => onPressNext(),
    },
    tutorialText2: {
      id: 2,
      title: 'Find your friends and play together on social media',
      desc: 'The best streaming anime app of the century to entertain you every day',
      image: images.onBoardingLight2,
      btnTitle: 'Next',
      onPress: () => onPressNext(),
    },
    tutorialText3: {
      id: 3,
      title: "Let's have fun with your friends & zuzu right now!",
      desc: 'The best streaming anime app of the century to entertain you every day',
      image: images.onBoardingLight3,
      btnTitle: 'Get Started',
      onPress: () => onPressGetStarted(),
    },
  };

  const TutorialItem = ({bgImage, header, btnPress, btnTitle}) => {
    return (
      <View
        style={[
          localStyles.tutorialContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <Image source={bgImage.image} style={localStyles.tutorialImage} />
        <View style={localStyles.headerContainer}>
          <ZText type={'b36'} align={'center'}>
            {header.title}
          </ZText>
        </View>
        <ZButton
          textType={'b18'}
          title={btnTitle.btnTitle}
          onPress={btnPress.onPress}
          containerStyle={localStyles.btnContainerStyle}
        />
      </View>
    );
  };

  const onPressGetStarted = async () => {
    await setAsyncStorageData(APP_OPEN_FIRST_TIME, 'firstTimeOpen');
    navigation.reset({
      index: 0,
      routes: [{name: StackNav.Auth}],
    });
  };

  const onPressNext = () => {
    swiper.scrollBy(1);
  };

  return (
    <Swiper
      ref={ref => (swiper = ref)}
      showsButtons={false}
      loop={false}
      activeDotStyle={[
        localStyles.activeDotStyle,
        {backgroundColor: colors.primary},
      ]}
      dotStyle={[localStyles.dotStyle, {backgroundColor: colors.white}]}
      paginationStyle={localStyles.paginationStyle}>
      <TutorialItem
        bgImage={OnBoardingData.tutorialText1}
        header={OnBoardingData.tutorialText1}
        btnPress={OnBoardingData.tutorialText1}
        btnTitle={OnBoardingData.tutorialText1}
      />
      <TutorialItem
        bgImage={OnBoardingData.tutorialText2}
        header={OnBoardingData.tutorialText2}
        btnPress={OnBoardingData.tutorialText2}
        btnTitle={OnBoardingData.tutorialText2}
      />
      <TutorialItem
        bgImage={OnBoardingData.tutorialText3}
        header={OnBoardingData.tutorialText3}
        btnPress={OnBoardingData.tutorialText3}
        btnTitle={OnBoardingData.tutorialText3}
      />
    </Swiper>
  );
};

export default OnBoarding;

const localStyles = StyleSheet.create({
  tutorialContainer: {
    ...styles.flex,
    ...styles.justifyCenter,
  },
  tutorialImage: {
    resizeMode: 'contain',
    height: getHeight(350),
    width: '75%',
    ...styles.mt50,
    ...styles.selfCenter,
    ...styles.flex,
  },
  paginationStyle: {
    bottom: getHeight(150),
  },
  btnContainerStyle: {
    ...styles.m25,
    bottom: getHeight(30),
  },
  dotStyle: {
    width: moderateScale(8),
    height: moderateScale(8),
    borderRadius: moderateScale(10),
    ...styles.mh5,
  },
  activeDotStyle: {
    width: moderateScale(25),
    height: moderateScale(8),
  },
  headerContainer: {
    bottom: getHeight(100),
    ...styles.mh15,
    ...styles.pt40,
    ...styles.itemsCenter,
    ...styles.justifyEnd,
  },
});
