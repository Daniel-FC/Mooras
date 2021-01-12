import { StyleSheet } from 'react-native';
import { colors, fonts, metrics, general } from '../../styles';

let margin = 15, heightTitle = 106, heightEpilogue = 220;
let heightLogo = metrics.height_pattern - heightTitle - heightEpilogue - (margin*5);
let widthLogo = metrics.width_pattern - (margin*2);

const styles = StyleSheet.create({
  ...general,
  
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColorHomeScreen
  },

  //=================================TITLE======================================
  containerTitle: {
    marginLeft: margin,
    marginRight: margin,
    height: heightTitle
  },
  txtTitle: {
    marginTop: margin,
    textAlign: 'center',
    fontFamily: fonts.bold,
    fontSize: metrics.font_xx_large,
    color: colors.white_pattern
  },

  //=================================IMAGE_MONTAIN==============================
  imageContainer: {
    marginTop: margin,
    marginLeft: margin,
    marginRight: margin,
    height: widthLogo < heightLogo ? widthLogo : heightLogo,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageMontain: {
    width: widthLogo < heightLogo ? widthLogo : heightLogo,
    height: '100%',
    resizeMode: 'stretch'
  },
  
  //=================================MOTIVATIONAL_TEXT==========================
  bodyContainer: {
    marginTop: margin,
    marginLeft: margin,
    marginRight: margin,
    height: heightEpilogue
  },
  txtBody: {
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: metrics.font_medium,
    color: colors.white_pattern
  },

  //=================================BUTTONS====================================
  btnCadastrar: {
    marginTop: margin,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.blue_pattern
  },
  btnCadastrado: {
    marginTop: margin-5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.backgroundColorHomeScreen
  }
});

export default styles;
