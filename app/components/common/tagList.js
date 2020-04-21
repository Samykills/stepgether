import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import COLORS from '../../theme/colors';

const TagList = ({tags}) => {
  const navigation = useNavigation();
  const onPressTag = item => {
    navigation.navigate('socialProfile', {userInfo: item});
  };

  return (
    <FlatList
      horizontal
      data={tags}
      keyExtractor={(item, index) => item.uid}
      renderItem={({item}) => {
        return (
          <Text style={[styles.tagText]} onPress={() => onPressTag(item)}>
            @{item.displayName}
          </Text>
        );
      }}
      contentContainerStyle={[styles.container]}
      ItemSeparatorComponent={() => <View style={[styles.itemSeperator]} />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  itemSeperator: {
    width: 5,
  },
  tagText: {
    color: COLORS.BLUE,
  },
});

TagList.propTypes = {
  tags: PropTypes.array,
};

export default TagList;
