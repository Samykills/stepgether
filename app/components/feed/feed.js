/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {SafeAreaView, FlatList, View} from 'react-native';
import FeedHeader from './feedHeader';
import Data from './apiData';
import PostCard from '../common/postCard';
import CreatePostButton from './components/createPostButton';
import FeedMessage from './components/feedMessage';
import {inject, observer} from 'mobx-react';
import {getAllPost} from '../../firestore/postCollectionFirestoreFunctions';

const EMPTYLIST_MESSAGE = 'Aah! nothing to see here, yet!';

const Feed = ({AuthStore}) => {
  const {userFollowersList} = AuthStore;
  const [state, setState] = useState({
    postList: [],
    refreshList: 0,
    isRefreshing: false,
  });

  useEffect(() => {
    if (userFollowersList.length > 0) {
      getAllPost(userFollowersList).then(result => {
        setState({
          ...state,
          isRefreshing: false,
          postList: result,
        });
      });
    }
  }, [userFollowersList, state.refreshList]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <FlatList
        removeClippedSubviews
        onRefresh={() => {
          setState({...state, refreshList: Math.random(), isRefreshing: true});
        }}
        refreshing={state.isRefreshing}
        ListHeaderComponent={() => (
          <FeedHeader userDetails={Data} userStories={Data.userStories} />
        )}
        ListEmptyComponent={() => <FeedMessage message={EMPTYLIST_MESSAGE} />}
        data={state.postList}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 20}} />}
        renderItem={({item}) => <PostCard key={item.id} post={item} />}
        keyExtractor={(item, index) => item.postId}
      />
      <CreatePostButton />
    </SafeAreaView>
  );
};
export default inject('AuthStore')(observer(Feed));
