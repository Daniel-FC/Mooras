import { StyleSheet } from 'react-native';
import { colors, metrics, general } from '../../styles';

let heightTitle = 110, heightEpilogue = 225;
let heightLogo = metrics.height_pattern - heightTitle - heightEpilogue - (metrics.margin*5);
let widthLogo = metrics.width_pattern - (metrics.margin*2);

const styles = StyleSheet.create({
  ...general,

  container: { 
    flex: 1,
    backgroundColor: colors.backgroundColorHomeScreen,
  },

  containerTitle: {
    marginLeft: metrics.margin,
    marginRight: metrics.margin,
    height: heightTitle,

  },
  txtTitle: {
    marginTop: metrics.margin,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: metrics.font_xx_large,
    color: colors.white_standard,
  },

  containerMontain: {
    marginTop: metrics.margin,
    marginLeft: metrics.margin,
    marginRight: metrics.margin,
    height: widthLogo < heightLogo ? widthLogo : heightLogo,
    justifyContent: 'center',
    alignItems: 'center',

  },
  imageMontain: {
    width: widthLogo < heightLogo ? widthLogo : heightLogo,
    height: '100%',
    resizeMode: 'stretch'
  },

  containerBody: {
    marginTop: metrics.margin,
    marginLeft: metrics.margin,
    marginRight: metrics.margin,
    height: heightEpilogue,

  },
  txtBody: {
    marginBottom: 5,
    textAlign: 'center',
    fontSize: metrics.font_medium,
    color: colors.white_standard,
  },

  btnCadastrar: {
    marginTop: metrics.margin,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.blue_standard,
  },
  btnCadastrado: {
    marginTop: metrics.margin-5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
  },
});
 
export default styles
