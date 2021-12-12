import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  font_small: 16,
  font_x_small: 18,
  font_medium: 20,
  font_large: 22,
  font_x_large: 24,
  font_xx_large: 34,
  font_gigant: 48,

  margin: 15,
  sizeIcon: 25,
  height_pattern: height,
  width_pattern: width,
};

export default metrics;
