// Library import
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// Local import
import ZSafeAreaView from '../../../components/common/ZSafeAreaView';
import {useSelector} from 'react-redux';
import {styles} from '../../../themes';
import {getHeight, moderateScale} from '../../../common/constants';
import ZText from '../../../components/common/ZText';
import {StackNav} from '../../../navigation/NavigationKeys';
import strings from '../../../i18n/strings';
import images from '../../../assets/images';
import ZButton from '../../../components/common/ZButton';
import {Inbox_Dark} from '../../../assets/svgs';
import SwitchAccont from '../../../components/models/SwitchAccont';
import ReelComponent from '../../../components/ReelComponent';
import {videoData} from '../../../api/constant';

const UserDetail = [
  {
    title: strings.post,
    value: '247',
  },
  {
    title: strings.followers,
    value: '368K',
  },
  {
    title: strings.following,
    value: '374',
  },
  {
    title: strings.like,
    value: '3.7M',
  },
];

export default function Profile({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const [isSelect, setIsSelect] = useState(0);
  const switchAccountRef = createRef(null);

  const categoryData = [
    {
      id: 0,
      icon: 'apps',
      onPress: () => setIsSelect(0),
    },
    {
      id: 1,
      icon: 'lock-closed',
      onPress: () => setIsSelect(1),
    },
    {
      id: 2,
      icon: 'bookmark',
      onPress: () => setIsSelect(2),
    },
    {
      id: 3,
      icon: 'heart',
      onPress: () => setIsSelect(3),
    },
  ];

  const onPressEditProfile = () => navigation.navigate(StackNav.EditProfile);

  const onPressSwitchAccount = () => switchAccountRef?.current?.show();

  const onPressSetting = () => navigation.navigate(StackNav.Setting);

  const onPressFindFriend = () => navigation.navigate(StackNav.FindFriends);

  const RenderUserDetail = ({item}) => {
    return (
      <View style={styles.itemsCenter}>
        <ZText type="b24" align={'center'}>
          {item.value}
        </ZText>
        <ZText type="m16" align={'center'} style={styles.mt10}>
          {item.title}
        </ZText>
      </View>
    );
  };

  const HeaderCategory = ({item}) => {
    return (
      <TouchableOpacity
        onPress={item.onPress}
        style={[
          localStyles.tabItemStyle,
          {
            borderBottomColor:
              isSelect === item.id ? colors.primary : colors.bColor,
          },
        ]}>
        <Ionicons
          name={item.icon}
          size={moderateScale(30)}
          color={isSelect === item.id ? colors.primary : colors.iconColor}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ZSafeAreaView>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={localStyles.root}>
        <View style={localStyles.headerContainer}>
          <TouchableOpacity onPress={onPressFindFriend}>
            <Ionicons
              name="person-add-outline"
              size={moderateScale(26)}
              color={colors.dark ? colors.white : colors.darkColor}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressSwitchAccount}
            style={styles.rowCenter}>
            <ZText type="b24">{'Andrew..'}</ZText>
            <Ionicons
              name="chevron-down-outline"
              size={moderateScale(24)}
              style={styles.ml5}
              color={colors.dark ? colors.white : colors.darkColor}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressSetting}>
            <Ionicons
              name="settings-outline"
              size={moderateScale(30)}
              color={colors.dark ? colors.white : colors.darkColor}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemsCenter}>
          <TouchableOpacity onPress={onPressEditProfile} style={styles.mt40}>
            <Image
              source={colors.dark ? images.userDark : images.userLight}
              style={localStyles.userImage}
            />
            <MaterialIcon
              name="pencil-box"
              size={moderateScale(30)}
              color={colors.primary}
              style={localStyles.editIcon}
            />
          </TouchableOpacity>
          <View style={styles.mv20}>
            <ZText type="b24" align={'center'}>
              {'Andrew Ainsley'}
            </ZText>
            <ZText type="m14" align={'center'} style={styles.mt10}>
              {'andrew_ainsley@yourdomain.com'}
            </ZText>
          </View>
        </View>
        <View style={[styles.flexRow, styles.justifyEvenly]}>
          {UserDetail.map((item, index) => (
            <RenderUserDetail item={item} key={index} />
          ))}
        </View>
        <ZButton
          title={strings.editProfile}
          onPress={onPressEditProfile}
          color={colors.primary}
          textType="b18"
          style={styles.ml10}
          containerStyle={[
            localStyles.buttonContainer,
            {borderColor: colors.primary},
          ]}
          bgColor={colors.tranparent}
          frontIcon={<Inbox_Dark />}
        />
        <View style={localStyles.mainContainer}>
          {categoryData.map((item, index) => (
            <HeaderCategory item={item} key={index} />
          ))}
        </View>
        <FlatList
          data={videoData}
          renderItem={({item, index}) => (
            <ReelComponent
              data={item?.views}
              reelUrl={item?.poster}
              isPlay={true}
            />
          )}
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.mt20}
        />
      </ScrollView>
      <SwitchAccont SheetRef={switchAccountRef} />
    </ZSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.ph20,
    ...styles.mb20,
  },
  headerContainer: {
    ...styles.flex,
    ...styles.flexRow,
    ...styles.alignCenter,
    ...styles.justifyBetween,
    ...styles.mt20,
  },
  userImage: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  buttonContainer: {
    ...styles.mt20,
    height: getHeight(45),
    borderRadius: moderateScale(22),
    borderWidth: moderateScale(1),
  },
  mainContainer: {
    ...styles.flexRow,
    width: '100%',
    ...styles.mt15,
  },
  tabItemStyle: {
    borderBottomWidth: moderateScale(2),
    width: '25%',
    ...styles.itemsCenter,
    ...styles.pv15,
  },
});
