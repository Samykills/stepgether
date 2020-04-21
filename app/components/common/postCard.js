import React from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import CardTitle from './cardTitle';
import PropTypes from 'prop-types';
import PostCardFooter from './postCardFooter';
import FastImage from 'react-native-fast-image';
import {modifyPostInCollection} from '../../firestore/postCollectionFirestoreFunctions';
import TagList from '../common/tagList';

const PostCard = ({post}) => {
  const {
    createdByUserDisplayName,
    createdByUserPhotoUrl,
    modifiedAt,
    postPhotoUrl,
    postBody,
    location,
    tags,
    likes,
  } = post;
  const onRightIconPress = () => {
    Alert.alert('Report!', 'Does this post contains offensive content?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => modifyPostInCollection(post)},
    ]);
  };

  return (
    <View style={[styles.container]}>
      <CardTitle
        name={createdByUserDisplayName}
        photoUrl={createdByUserPhotoUrl}
        postedOn={modifiedAt}
        location={location}
        onRightIconPress={onRightIconPress}
      />
      <FastImage source={{uri: postPhotoUrl}} style={[styles.imageStyle]} />
      <View style={[styles.textViewStyle]}>
        {likes > 0 ? <Text style={[styles.likes]}>{likes} Likes</Text> : null}
        <TagList tags={tags} />
        <Text style={[styles.body]}>{postBody}</Text>
      </View>
      <PostCardFooter post={post} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFFFF'},
  imageStyle: {height: 350},
  textViewStyle: {padding: 10},
  likes: {
    fontSize: 10,
  },
  body: {
    fontSize: 14,
  },
});

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
