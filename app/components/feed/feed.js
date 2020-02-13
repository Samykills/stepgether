/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {inject} from 'mobx-react';
import FeedHeader from './feedHeader';
import FeedBody from './feedBody';
const Data = {
  userName: 'Ullas Gupta',
  userImageUrl:
    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jp',
  postList: [
    {
      id: 1,
      name: 'Steve Siano',
      profileImageUrl:
        'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
      postImageUrl:
        'http://i.huffpost.com/gen/1011372/images/o-FITNESS-TRACKER-facebook.jpg',
      postText: 'Jogg for a mile a day, keep the doctor away!',
      postedOn: '2nd January 2020 8:53 AM',
      likes: 3,
      likedByUser: false,
      comments: [
        {
          id: 1,
          postedBy: 'Steve Wozniak',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 0,
          likedByUser: false,
        },
        {
          id: 2,
          postedBy: 'Richard Branson',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 3,
          likedByUser: true,
        },
        {
          id: 3,
          postedBy: 'Bill Gates',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 1,
          likedByUser: false,
        },
        {
          id: 4,
          postedBy: 'Steve Balmer',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 0,
          likedByUser: true,
        },
      ],
    },
    {
      id: 2,
      name: 'Richard Hook',
      profileImageUrl:
        'http://dubeat.com/wp-content/uploads/Professional-Fitness-Photography-0024.jpg',
      postImageUrl: 'https://i.ytimg.com/vi/aWlJqhECHPg/maxresdefault.jpg',
      postText:
        'Weights are the way to go, to know more follow me on stepgether!!',
      postedOn: '7th Feburary 2020 18:53 PM',
      likes: 12,
      likedByUser: true,
      comments: [
        {
          id: 1,
          postedBy: 'Steve Wozniak',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 0,
          likedByUser: false,
        },
        {
          id: 2,
          postedBy: 'Richard Branson',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 3,
          likedByUser: true,
        },
        {
          id: 3,
          postedBy: 'Bill Gates',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 1,
          likedByUser: false,
        },
        {
          id: 4,
          postedBy: 'Steve Balmer',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 0,
          likedByUser: true,
        },
      ],
    },
    {
      id: 3,
      name: 'Gregory Richardson',
      profileImageUrl:
        'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
      postImageUrl: 'https://i.ytimg.com/vi/gFyxKN58wA0/maxresdefault.jpg',
      postText: 'Had a great shoulder day, time to work on my arms!',
      postedOn: '12th March 2020 22:23 PM',
      likes: 0,
      likedByUser: false,
      comments: [
        {
          id: 1,
          postedBy: 'Steve Wozniak',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 0,
          likedByUser: false,
        },
        {
          id: 2,
          postedBy: 'Richard Branson',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 3,
          likedByUser: true,
        },
        {
          id: 3,
          postedBy: 'Bill Gates',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 1,
          likedByUser: false,
        },
        {
          id: 4,
          postedBy: 'Steve Balmer',
          postedByUserProfileImage:
            'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
          commentBody: 'This is the 1st comment!',
          createdDateTime: '2nd January 2020 8:53 AM',
          likes: 0,
          likedByUser: true,
        },
      ],
    },
  ],
};
const Feed = ({AuthStore, navigation}) => {
  const {unSetUserToken, unSetSelectedDeviceToken} = AuthStore;

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <FeedHeader userDetails={Data} />
      <FeedBody postList={Data.postList} />
    </SafeAreaView>
  );
};
export default inject('AuthStore')(Feed);
