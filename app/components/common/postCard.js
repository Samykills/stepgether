import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import CardTitle from './cardTitle';
import PropTypes from 'prop-types';
import PostCardFooter from './postCardFooter';

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
        postedOn={modifiedAt.toDate().toString()}
      />
      <Image
        source={{uri: postPhotoUrl}}
        style={[styles.imageStyle]}
        resizeMode={'cover'}
        resizeMethod={'scale'}
      />
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
