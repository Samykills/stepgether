import React, {useState, useLayoutEffect} from 'react';
import {View, Dimensions, Image, StyleSheet, FlatList} from 'react-native';
import {Divider, Input, Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import PeopleSearch from '../friendsView/peopleSearch';
import Chip from '../common/chip';
import AddLocation from '../common/addLocation';

const {height, width} = Dimensions.get('screen');

const CreatePostView = props => {
  const {fileUri} = props.route.params;
  const [post, setPost] = useState({
    fileUri: fileUri,
    tags: [],
    location: null,
    postBody: '',
  });
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button type="clear" onPress={onPressShare} title="Share" />
      ),
    });
  }, []);

  const onPressShare = () => {
    //if fileUri & postBody present
    if (post.fileUri && post.postBody) {
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
      tags.push(item);
      setPost({...post, tags: tags});
    }
  };

  const onChipPress = value => {
    let tags = post.tags;
    let i = 0;
    while (tags[i].displayName !== value) {
      i++;
    }
    tags.splice(i, 1);
    setPost({...post, tags: tags});
  };

  const onUserLocationSelection = place => {
    setPost({...post, location: place});
  };

  const onLocationChipPress = () => {
    setPost({...post, location: null});
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.postContainer]}>
        <Image style={[styles.image]} source={{uri: fileUri}} />
        <Input placeholder="Write a caption..." />
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
                  <Chip value={item.displayName} onPress={onChipPress} />
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
});

export default CreatePostView;
