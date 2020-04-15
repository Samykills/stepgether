import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements';
import COLORS from '../../../theme/colors';
import ImagePicker from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {useNavigation} from '@react-navigation/native';

const IMAGE_WIDTH = 1280;
const IMAGE_HEIGHT = 720;

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
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        ImageResizer.createResizedImage(
          response.uri,
          IMAGE_WIDTH,
          IMAGE_HEIGHT,
          'PNG',
          80,
        )
          .then(response => {
            navigation.navigate('createPostView', {fileUri: response.uri});
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
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
      }
    });
  };
  return (
    <View
      style={{
        position: 'absolute',
        bottom: '3%',
        right: '3%',
      }}>
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

export default CreatePostButton;