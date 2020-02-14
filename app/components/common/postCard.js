import React from 'react';
import {View, Text, Image} from 'react-native';
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
    <View style={{flex: 1, backgroundColor: '#FFFFFFFF'}}>
      <CardTitle
        name={name}
        profileImageUrl={profileImageUrl}
        postedOn={postedOn}
      />
      <Image
        source={{uri: postImageUrl}}
        style={{height: 350}}
        resizeMode={'cover'}
        resizeMethod={'scale'}
      />
      <View style={{padding: 10}}>
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

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
