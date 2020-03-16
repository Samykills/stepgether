import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
const ErrorView = () => (
  <View style={[styles.container]}>
    <Text>Aww snap! Something went wrong!</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});
export default ErrorView;
