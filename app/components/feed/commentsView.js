import React from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {Text} from 'react-native';
import CommentsData from './commentsData';
import PropTypes from 'prop-types';
import {useNavigation, useRoute} from '@react-navigation/native';
import {ListItem} from 'react-native-elements';

const CommentsView = () => {
  const navigation = useNavigation();
  const params = useRoute().params;
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <FlatList
        data={CommentsData}
        renderItem={({item}) => {
          return item.postedByUserProfileImage ? (
            <ListItem
              leftAvatar={{source: {uri: item.postedByUserProfileImage}}}
              title={item.postedBy}
              subtitle={item.createdDateTime}
              bottomDivider
              // children={() => {
              //   debugger;
              //   return ;
              // }}
            >
              <Text>{item.commentBody}</Text>
            </ListItem>
          ) : (
            <ListItem
              leftAvatar={{title: item.postedBy}}
              title={item.postedBy}
              subtitle={item.createdDateTime}
              bottomDivider
              children={() => {
                debugger;
                return <Text>{item.commentBody}</Text>;
              }}
            />
          );
        }}
        keyExtractor={(item, index) => item.id}
      />
    </SafeAreaView>
  );
};

CommentsView.propTypes = {
  postId: PropTypes.number,
};
export default CommentsView;
