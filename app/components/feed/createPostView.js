import React, {useState, useLayoutEffect} from 'react';
import {View, Dimensions, StyleSheet, FlatList} from 'react-native';
import {Divider, Input, Button} from 'react-native-elements';
import Snackbar from 'react-native-snackbar';
import PeopleSearch from '../friendsView/peopleSearch';
import Chip from '../common/chip';
import AddLocation from '../common/addLocation';
import {savePostToCollection} from '../../firestore/postCollectionFirestoreFunctions';
import FastImage from 'react-native-fast-image';

const {height, width} = Dimensions.get('screen');

const CreatePostView = props => {
  const {fileUri} = props.route.params;
  const [post, setPost] = useState({
    postPhotoUrl: fileUri,
    tags: [],
    location: null,
    postBody: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigation = props.navigation;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          type="clear"
          onPress={onPressShare}
          title="Share"
          disabled={isLoading}
        />
      ),
    });
  }, [post, isLoading]);

  const onPressShare = () => {
    //if postPhotoUrl & postBody present
    if (post.postPhotoUrl && post.postBody) {
      setIsLoading(true);
      savePostToCollection(post)
        .then(res => {
          setIsLoading(false);
          navigation.goBack();
        })
        .catch(err => {
          setIsLoading(false);
        });
    } else {
      Snackbar.show({
        text: 'Write something first!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const onSearchClick = item => {
    let tags = post.tags;
    let ifItemInList = false;
    let i = 0;
    while (i < tags.length) {
      if (tags[i].uid === item.uid) {
        ifItemInList = true;
      }
      i++;
    }
    if (!ifItemInList) {
      let taggedUserInfo = {
        uid: item.uid,
        emailId: item.emailId,
        displayName: item.displayName,
        photoUrl: item.photoUrl,
      };
      tags.push(taggedUserInfo);
      setPost({...post, tags: tags});
    }
  };

  const onUserChipPress = value => {
    let tags = post.tags;
    let i = 0;
    while (tags[i].displayName !== value) {
      i++;
    }
    tags.splice(i, 1);
    setPost({...post, tags: tags});
  };

  const onUserLocationSelection = place => {
    let locationObj = {
      name: place.name,
      address: place.address,
      location: place.location,
    };
    setPost({...post, location: locationObj});
  };

  const onLocationChipPress = () => {
    setPost({...post, location: null});
  };

  const onChangeCaption = text => {
    setPost({...post, postBody: text});
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.postContainer]}>
        <FastImage style={[styles.image]} source={{uri: post.postPhotoUrl}} />
        <View style={[styles.inputStyle]}>
          <Input
            placeholder="Write a caption..."
            autoFocus={false}
            autoCorrect={false}
            autoCompleteType={'off'}
            onChangeText={onChangeCaption}
          />
        </View>
      </View>
      <Divider />
      <PeopleSearch
        searchHint={'Tag People'}
        searchResultsStyle={styles.searchStyle}
        onSearchClick={onSearchClick}
      />
      <Divider />
      {post.tags.length > 0 ? (
        <>
          <View style={[styles.tags]}>
            <FlatList
              horizontal
              data={post.tags}
              keyExtractor={(item, index) => item.uid}
              renderItem={({item}) => (
                <View style={[styles.chipContainer]}>
                  <Chip value={item.displayName} onPress={onUserChipPress} />
                </View>
              )}
            />
          </View>
          <Divider />
        </>
      ) : null}
      <View style={[styles.locationContainer]}>
        <AddLocation onPress={onUserLocationSelection} />
        {post.location ? (
          <View style={[styles.chipContainer]}>
            <Chip value={post.location.name} onPress={onLocationChipPress} />
          </View>
        ) : null}
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  image: {width: width * 0.2, height: height * 0.1},
  postContainer: {flexDirection: 'row', padding: 10, alignItems: 'center'},
  tags: {
    height: 50,
  },
  searchStyle: {top: 175},
  chipContainer: {padding: 8, justifyContent: 'center'},
  locationContainer: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  inputStyle: {
    width: '80%',
  },
});

export default CreatePostView;
