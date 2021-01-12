import { useFonts } from 'expo-font';

function createFonts() {
  let [fontsLoaded] = useFonts({
    'Roboto-Regular': require('../../assets/fonts/roboto/Roboto-Regular.ttf'),
    'Roboto-Black': require('../../assets/fonts/roboto/Roboto-Black.ttf'),
  });
  return fontsLoaded;
}

const fonts = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Black'
};

export { createFonts, fonts };
