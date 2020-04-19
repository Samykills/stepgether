import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {Text} from 'react-native-elements';
import LottieView from 'lottie-react-native';

const FeedMessage = ({message}) => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.messageContainer]}>
        <LottieView
          loop={true}
          autoPlay={true}
          cacheStrategy={'strong'}
          source={require('../../../resources/animations/empty_box.json')}
          hardwareAccelerationAndroid={true}
          style={[styles.lottieViewStyle]}
        />
        <Text h4>{message}</Text>
      </View>
    </View>
  );
};

FeedMessage.propTypes = {
  message: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  messageContainer: {
    padding: 20,
    backgroundColor: '#E1306C44',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottieViewStyle: {
    width: 200,
    height: 200,
  },
});
export default FeedMessage;
