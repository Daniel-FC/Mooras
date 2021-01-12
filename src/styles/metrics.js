import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  font_small: 16,
  font_medium: 18,
  font_large: 20,
  font_x_large: 22,
  font_xx_large: 33,

  sizeIcon: 25,
  height_pattern: height,
  width_pattern: width
};

export default metrics;
