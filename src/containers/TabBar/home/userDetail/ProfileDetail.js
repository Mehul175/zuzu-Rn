// Library import
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

// Local import
import ZSafeAreaView from '../../../../components/common/ZSafeAreaView';
import ZHeader from '../../../../components/common/ZHeader';
import {getHeight, moderateScale} from '../../../../common/constants';
import {styles} from '../../../../themes';
import ZText from '../../../../components/common/ZText';
import images from '../../../../assets/images';
import ZButton from '../../../../components/common/ZButton';
import {InstagramBg, LikeBg, LikeIconModal} from '../../../../assets/svgs';
import {StackNav} from '../../../../navigation/NavigationKeys';
import SuccessModal from '../../../../components/models/SuccessModal';
import ReelComponent from '../../../../components/ReelComponent';
import {UserDetailCategory, videoData} from '../../../../api/constant';

export default function ProfileDetail({navigation, route}) {
  const {userName, userImage} = route.params;
  const colors = useSelector(state => state.theme.theme);
  const [isSelect, setIsSelect] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  const categoryData = [
    {
      id: 0,
      icon: 'apps',
      onPress: () => setIsSelect(0),
    },
    {
      id: 1,
      icon: 'bookmark',
      onPress: () => setIsSelect(1),
    },
    {
      id: 2,
      icon: 'heart',
      onPress: () => setIsSelect(2),
    },
  ];

  const onPressEditProfile = () => navigation.navigate(StackNav.UserNetwork);
  const onPressModalClose = () => setModalVisible(false);

  const onPressLike = () => setModalVisible(true);

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

  const RightIcon = () => {
    return (
      <View style={styles.rowCenter}>
        <TouchableOpacity>
          <Ionicons
            name="notifications-outline"
            size={moderateScale(26)}
            color={colors.textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="ellipsis-horizontal-circle-outline"
            size={moderateScale(26)}
            color={colors.textColor}
            style={styles.ml10}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const onPressMessage = () =>
    navigation.navigate(StackNav.Chat, {
      userName: userName,
      userImage: userImage,
    });

  return (
    <ZSafeAreaView>
      <ZHeader title={userName} rightIcon={<RightIcon />} />
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={localStyles.root}>
        <View style={styles.itemsCenter}>
          <TouchableOpacity onPress={onPressEditProfile} style={styles.mt25}>
            {!!userImage?.length ? (
              <Image
                source={{
                  uri: userImage,
                }}
                style={localStyles.userImage}
              />
            ) : (
              <Image
                source={colors.dark ? images.userDark : images.userLight}
                style={localStyles.userImage}
              />
            )}
          </TouchableOpacity>
          <View style={styles.mv20}>
            <ZText type="b24" align={'center'}>
              {userName}
            </ZText>
            <ZText type="m14" align={'center'} style={styles.mt10}>
              {'andrew_ainsley@yourdomain.com'}
            </ZText>
          </View>
        </View>
        <View style={[styles.flexRow, styles.justifyEvenly]}>
          {UserDetailCategory.map((item, index) => (
            <RenderUserDetail item={item} key={index} />
          ))}
        </View>
        <View style={localStyles.editProfileContainer}>
          <ZButton
            title={strings.follow}
            onPress={onPressEditProfile}
            color={colors.white}
            textType="b14"
            style={styles.ml5}
            containerStyle={[
              localStyles.buttonContainer,
              {borderColor: colors.primary},
            ]}
            bgColor={colors.primary}
            frontIcon={
              <Ionicons
                name="person-add-outline"
                size={moderateScale(18)}
                color={colors.white}
              />
            }
          />
          <ZButton
            title={strings.message}
            color={colors.primary}
            onPress={onPressMessage}
            textType="b14"
            style={styles.ml5}
            containerStyle={[
              localStyles.buttonContainer,
              {borderColor: colors.primary},
            ]}
            bgColor={colors.tranparent}
            frontIcon={
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={moderateScale(18)}
                color={colors.primary}
              />
            }
          />
          <InstagramBg />
          <TouchableOpacity onPress={onPressLike}>
            <LikeBg />
          </TouchableOpacity>
        </View>
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
      <SuccessModal
        visible={modalVisible}
        onPressModalClose={onPressModalClose}
        headerTitle={'27M Total Likes'}
        subTitle={'jenny_wilson received a total of 27M likes from all videos.'}
        itemImage={<LikeIconModal style={styles.selfCenter} />}
        btnText={'Ok'}
      />
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
    borderRadius: moderateScale(50),
  },
  editProfileContainer: {
    ...styles.flexRow,
    ...styles.justifyEvenly,
    ...styles.mt25,
  },
  buttonContainer: {
    ...styles.ph15,
    height: getHeight(40),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(1),
    width: '30%',
  },
  mainContainer: {
    ...styles.flexRow,
    width: '100%',
    ...styles.mt15,
  },
  tabItemStyle: {
    borderBottomWidth: moderateScale(2),
    width: '33%',
    ...styles.itemsCenter,
    ...styles.pv15,
  },
});
