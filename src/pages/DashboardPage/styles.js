import { StyleSheet } from 'react-native';
import { colors, metrics, general } from '../../styles';
 
const styles = StyleSheet.create({
  ...general,

  container: { 
    flex: 1,
    backgroundColor: colors.blue_standard,
  },

  containerLineOne: {
    flex: 1,
    marginLeft: metrics.margin,
    marginRight: metrics.margin,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerLineTwo: {
    flex: 1,
    marginLeft: metrics.margin,
    marginRight: metrics.margin,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerLineThree: {
    flex: 2,
    marginLeft: metrics.margin,
    marginRight: metrics.margin,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  containerGain: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  txtBoldGreen: {
    fontSize: metrics.font_xx_small,
    color: colors.green_standard,
    fontWeight: 'bold',
  },
  txtBoldRed: {
    fontSize: metrics.font_xx_small,
    color: colors.red_standard,
    fontWeight: 'bold',
  },

  containerBody_Dashboard: {
    flex: 4,
    backgroundColor: colors.white_standard,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
});
 
export default styles
