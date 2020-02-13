import React from 'react';
import {ScrollView, View} from 'react-native';
import PostCard from '../common/postCard';

const FeedBody = ({postList}) => {
  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {postList.map(post => (
          <PostCard key={post.id} post={post}/>
        ))}
      </ScrollView>
    </View>
  );
};

export default FeedBody;
