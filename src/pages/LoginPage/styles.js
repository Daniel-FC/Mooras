import { StyleSheet } from 'react-native';
import { colors, metrics, general } from '../../styles';
 
const styles = StyleSheet.create({
  ...general,

  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.backgroundColorHomeScreen,
  },

  containerPrologue: { 
    flexDirection: 'row'
  },
  containerPLeft: { 
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '37%', 
  },
  containerPRight: { 
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '63%',
  },

  imgLogo: {
    width: 50,
    height: 50,
    marginRight: 25,
  },
  txtTitle: {
    fontSize: metrics.font_gigant,
    color: colors.white_standard,
    fontWeight: 'bold',
  },
  txtSubTitle: {
    fontSize: metrics.font_small,
    color: colors.white_standard,
    fontWeight: 'bold',
    marginBottom: metrics.margin,
  },

  input: {
    marginBottom: metrics.margin,
    width: '90%',
    borderRadius: 7,
    padding: 10,
    backgroundColor: colors.white_standard,
    color: colors.black_standard,
    fontSize: metrics.font_medium,
  },

  containerAlert: {
    marginBottom: 10,
    flexDirection: "row",
    justifyContent:"center",
    alignItems: "center",
  },
  txtAlert: {
    paddingLeft: metrics.margin,
    color: colors.red_standard,
    fontSize: metrics.font_x_small,
  },

  btnLogin: {
    height: 45,
    padding: 8,
    width: '90%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue_standard,
  },

  registration: {
    marginTop: metrics.margin,
    color: colors.white_standard,
  },
  linkSubscribe: {
    color: colors.blue_icon,
    marginTop: metrics.margin,
    
  },
});
 
export default styles
