import { StyleSheet } from 'react-native';
import { colors, fonts, metrics, general } from '../../styles';

const styles = StyleSheet.create({
  ...general,
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColorHomeScreen
  },

  //=================================LOGO=======================================
  containerLogo: {
    flex: 1,
    width: '95%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  imageLogo: {
    marginTop: 15,
    width: 40,
    height: 40
  },

  //=================================BODY=======================================
  containerBody: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    paddingBottom: 50
  },

  //=================================TITLE======================================
  txtTitle: {
    fontFamily: fonts.bold,
    fontSize: metrics.font_large,
    color: colors.white_pattern,
    marginBottom: 20
  },
  
  //=================================INPUTS=====================================
  input: {
    marginBottom: 15,
    width: '90%',
    borderRadius: 7,
    padding: 10,
    backgroundColor: colors.white_pattern,
    color: colors.black_pattern,
    fontFamily: fonts.regular,
    fontSize: metrics.font_medium
  },

  //=================================BUTTONS====================================
  btnUser: {
    height: 45,
    padding: 8,
    width: '90%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue_pattern
  }
});

export default styles;
