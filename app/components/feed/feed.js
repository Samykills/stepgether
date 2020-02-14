/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';
import {inject} from 'mobx-react';
import FeedHeader from './feedHeader';
import Data from './apiData';
import PostCard from '../common/postCard';

const Feed = ({AuthStore, navigation}) => {
  const {unSetUserToken, unSetSelectedDeviceToken} = AuthStore;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <FlatList
        ListHeaderComponent={() => (
          <FeedHeader userDetails={Data} userStories={Data.userStories} />
        )}
        data={Data.postList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        renderItem={({item}) => <PostCard key={item.id} post={item} />}
        keyExtractor={(item, index) => item.id.toString()}
      />
    </SafeAreaView>
  );
};
export default inject('AuthStore')(Feed);
