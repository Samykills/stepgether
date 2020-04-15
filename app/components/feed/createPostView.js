import React, {useState, useLayoutEffect} from 'react';
import {View, Dimensions, Image, StyleSheet, FlatList} from 'react-native';
import {Divider, Input, Button, Text, Badge} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import PeopleSearch from '../friendsView/peopleSearch';
import Chip from '../common/chip';

const {height, width} = Dimensions.get('screen');

const CreatePostView = props => {
  const {fileUri} = props.route.params;
  const [post, setPost] = useState({
    fileUri: fileUri,
    tags: [],
    location: '',
    postBody: '',
  });
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          type="clear"
          onPress={() => alert('Share pressed')}
          title="Share"
        />
      ),
    });
  }, []);

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

  return (
    <View style={[styles.container]}>
      <View style={{flexDirection: 'row', padding: 10, alignItems: 'center'}}>
        <Image
          style={{width: width * 0.2, height: height * 0.1}}
          source={{uri: fileUri}}
        />
        <Input placeholder="Write a caption..." />
      </View>
      <Divider />
      <PeopleSearch
        searchHint={'Tag People'}
        searchResultsStyle={{top: 175}}
        onSearchClick={onSearchClick}
      />
      <Divider />
      {post.tags.length > 0 ? (
        <>
          <View
            style={{
              height: 50,
            }}>
            <FlatList
              horizontal
              data={post.tags}
              keyExtractor={(item, index) => item.uid}
              renderItem={({item}) => (
                <View
                  style={{
                    padding: 5,
                    justifyContent: 'center',
                  }}>
                  <Chip value={item.displayName} onPress={onChipPress} />
                </View>
              )}
            />
          </View>
          <Divider />
        </>
      ) : null}
      <View style={{flexDirection: 'row', padding: 10}}>
        <Button
          title="Add Location"
          type="clear"
          raised={false}
          titleStyle={{color: 'black'}}
          buttonStyle={{borderColor: 'black'}}
          icon={{
            name: 'location-pin',
            size: 20,
            color: 'black',
            type: 'entypo',
          }}
        />
      </View>
      <Divider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default CreatePostView;
