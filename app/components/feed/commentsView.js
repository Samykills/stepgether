import React from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native';
import CommentsData from './commentsData';
import PropTypes from 'prop-types';
import {ListItem} from 'react-native-elements';

const CommentsView = () => {
  return (
    <SafeAreaView style={[styles.container]}>
      <FlatList
        data={CommentsData}
        renderItem={({item}) => {
          return item.postedByUserProfileImage ? (
            <ListItem
              leftAvatar={{source: {uri: item.postedByUserProfileImage}}}
              title={item.postedBy}
              subtitle={item.createdDateTime}
              bottomDivider>
              <Text>{item.commentBody}</Text>
            </ListItem>
          ) : (
            <ListItem
              leftAvatar={{title: item.postedBy}}
              title={item.postedBy}
              subtitle={item.createdDateTime}
              bottomDivider
              children={() => {
                return <Text>{item.commentBody}</Text>;
              }}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

CommentsView.propTypes = {
  postId: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
export default CommentsView;
