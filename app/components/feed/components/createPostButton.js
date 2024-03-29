import React from 'react';
import {View, Alert, Platform, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import COLORS from '../../../theme/colors';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {useNavigation} from '@react-navigation/native';

const IMAGE_WIDTH = 1080;
const IMAGE_HEIGHT = 566;
const IMAGE_TYPE_WEBP = 'WEBP';
const IMAGE_TYPE_PNG = 'PNG';

const CreatePostButton = () => {
  const navigation = useNavigation();
  const openImagePicker = () => {
    const options = {
      title: 'Post',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      noData: true,
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const resizeImageWidth =
          response.width < IMAGE_WIDTH ? response.width : IMAGE_WIDTH;
        const resizeImageHeight =
          response.height < IMAGE_HEIGHT ? response.height : IMAGE_HEIGHT;
        if (response.type) {
          ImageResizer.createResizedImage(
            response.uri,
            resizeImageWidth,
            resizeImageHeight,
            Platform.OS === 'ios' ? IMAGE_TYPE_PNG : IMAGE_TYPE_WEBP,
            80,
          )
            .then(res => {
              navigation.navigate('createPostView', {fileUri: res.uri});
              // response.uri is the URI of the new image that can now be displayed, uploaded...
              // response.path is the path of the new image
              // response.name is the name of the new image with the extension
              // response.size is the size of the new image
            })
            .catch(err => {
              navigation.navigate('createPostView', {fileUri: response.uri});
              // Oops, something went wrong. Check that the filename is correct and
              // inspect err to get more details.
            });
        } else {
          Alert.alert('', 'Aah this file type is not supported!');
        }
      }
    });
  };
  return (
    <View style={[styles.container]}>
      <Icon
        reverse
        raised
        name="plus"
        type="entypo"
        color={COLORS.BLUE}
        onPress={openImagePicker}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: '1%',
    right: '3%',
  },
});
export default CreatePostButton;
