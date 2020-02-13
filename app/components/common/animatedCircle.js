import React from 'react';
import {Text} from 'react-native';
import AnimateNumber from 'react-native-animate-number';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
const AnimatedCircle = ({currentValue, maxValue, textStyle, title, size}) => {
  return (
    <AnimatedCircularProgress
      size={size}
      width={5}
      fill={(currentValue / maxValue) * 100}
      tintColor="#1D1C20"
      backgroundColor="#DCDAE0"
      children={() => (
        <>
          <AnimateNumber
            style={textStyle}
            value={currentValue}
            formatter={val => {
              return Math.ceil(val);
            }}
          />
          <Text>{title}</Text>
        </>
      )}
    />
  );
};

export default AnimatedCircle;
