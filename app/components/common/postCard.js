import React from 'react';
import {Text} from 'react-native';
import {Card} from 'react-native-elements';
import CardTitle from './cardTitle';
import PropTypes from 'prop-types';
import PostCardFooter from './postCardFooter';
const PostCard = ({post}) => {
  const {
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
    <Card
      title={
        <CardTitle
          name={name}
          profileImageUrl={profileImageUrl}
          postedOn={postedOn}
        />
      }
      image={{
        uri: postImageUrl,
      }}>
      <Text style={{marginBottom: 10}}>{postText}</Text>
      <PostCardFooter
        likes={likes}
        comments={comments}
        likedByUser={likedByUser}
      />
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.object,
};

export default PostCard;
