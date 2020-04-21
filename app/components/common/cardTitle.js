import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ListItem, Text, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {dateFormatPost} from '../../util/dateUtil';
import COLORS from '../../theme/colors';

const CardTitle = ({
  displayName,
  photoUrl,
  postedOn,
  location,
  onRightIconPress,
}) => {
  const formattedDate = dateFormatPost(postedOn);
  const SubtitleComponent = () => {
    return (
      <View>
        {location ? (
          <Text style={[styles.subtitle]}>{location.name}</Text>
        ) : null}
        <Text style={[styles.subtitle]}>{formattedDate}</Text>
      </View>
    );
  };

  const RightIconComponent = () => {
    return (
      <Icon
        size={16}
        name="dots-three-vertical"
        type="entypo"
        color={COLORS.BLACK}
        onPress={onRightIconPress}
      />
    );
  };

  return (
    <ListItem
      leftAvatar={
        photoUrl.includes('http')
          ? {source: {uri: photoUrl}}
          : {title: {displayName}}
      }
      title={displayName}
      subtitle={<SubtitleComponent />}
      bottomDivider
      rightIcon={<RightIconComponent />}
    />
  );
};

CardTitle.proptypes = {
  displayName: PropTypes.string,
  photoUrl: PropTypes.string,
  postedOn: PropTypes.object,
  location: PropTypes.object,
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 10,
  },
});
export default CardTitle;
