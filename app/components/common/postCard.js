import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import CardTitle from './cardTitle';
import PropTypes from 'prop-types';
import PostCardFooter from './postCardFooter';
const PostCard = ({post}) => {
  const {
    id,
    name,
    profileImageUrl,
    postedOn,
    postImageUrl,
    postText,
    likes,
    comments,
    likedByUser,
  } = post;
  return (
    <View style={[styles.container]}>
      <CardTitle
        name={name}
        profileImageUrl={profileImageUrl}
        postedOn={postedOn}
      />
      <Image
        source={{uri: postImageUrl}}
        style={[styles.imageStyle]}
        resizeMode={'cover'}
        resizeMethod={'scale'}
      />
      <View style={[styles.textViewStyle]}>
        <Text>{postText}</Text>
      </View>
      <PostCardFooter
        postId={id}
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
