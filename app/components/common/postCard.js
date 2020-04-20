import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CardTitle from './cardTitle';
import PropTypes from 'prop-types';
import PostCardFooter from './postCardFooter';
import FastImage from 'react-native-fast-image';

const PostCard = ({post}) => {
  const {
    postId,
    createdByUserDisplayName,
    createdByUserPhotoUrl,
    modifiedAt,
    postPhotoUrl,
    postBody,
    likes,
    comments,
    likedByUser = false,
  } = post;

  return (
    <View style={[styles.container]}>
      <CardTitle
        name={createdByUserDisplayName}
        photoUrl={createdByUserPhotoUrl}
        postedOn={modifiedAt}
      />
      <FastImage source={{uri: postPhotoUrl}} style={[styles.imageStyle]} />
      <View style={[styles.textViewStyle]}>
        <Text>{postBody}</Text>
      </View>
      <PostCardFooter
        postId={postId}
        likes={likes}
        comments={comments}
        likedByUser={likedByUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFFFF'},
  imageStyle: {height: 350},
  textViewStyle: {padding: 10},
});

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
