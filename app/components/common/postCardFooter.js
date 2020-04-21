import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Icon, Button, Divider} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {likeAPost} from '../../firestore/postCollectionFirestoreFunctions';
import auth from '@react-native-firebase/auth';

const PostCardFooter = ({post}) => {
  const currentUserId = auth().currentUser.uid;
  const {postId, likedByUsers} = post;
  const navigation = useNavigation();
  const [state, setState] = useState({likedByUsers: likedByUsers});

  const openCommentsView = () => {
    navigation.navigate('commentsView', {postId: postId});
  };

  const likeClicked = () => {
    likeAPost(post).then(postData => {
      setState({likedByUsers: postData.likedByUsers});
    });
  };

  return (
    <>
      <Divider />
      <View style={[styles.container]}>
        <FooterIcon
          iconName={
            state.likedByUsers.includes(currentUserId) ? 'like1' : 'like2'
          }
          iconType={'antdesign'}
          iconColor={
            state.likedByUsers.includes(currentUserId) ? '#2196F3' : 'grey'
          }
          onPress={likeClicked}
        />
        <View style={[styles.divider]} />
        <FooterIcon
          iconName={'chat'}
          iconType={'material'}
          iconColor={'grey'}
          onPress={openCommentsView}
        />
      </View>
    </>
  );
};

const FooterIcon = ({iconName, iconType, iconColor, onPress}) => (
  <Button
    icon={<Icon name={iconName} type={iconType} color={iconColor} />}
    titleStyle={{color: iconColor}}
    type={'clear'}
    onPress={onPress}
    style={[styles.footerIconStyle]}
  />
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#000000FF',
  },
  footerIconStyle: {width: 80},
});

PostCardFooter.proptypes = {
  post: PropTypes.object,
};

export default PostCardFooter;
