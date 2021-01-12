import { StyleSheet } from 'react-native';
import { colors, fonts, metrics } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    alignItems: 'center',
    borderRadius: 5,
    padding: 7
  },
  containerElements: {
    flexDirection: 'row'
  },

  //================================TOP_ELEMENTS================================
  containerNameClient: {
    width: '74%'
  },
  txtNameClient: {
    fontFamily: fonts.bold,
    fontSize: metrics.font_medium,
    color: colors.black_pattern,
    marginRight: '0%',
  },

  containerValue: {
    width: '26%',
    alignItems: 'flex-end'
  },
  valueClientPin: {
    fontFamily: fonts.regular,
    fontSize: metrics.font_small,
    color: colors.red_check
  },
  valueClientCheck: {
    fontFamily: fonts.regular,
    fontSize: metrics.font_small,
    color: colors.green_check
  },

//================================BOT_ELEMENTS================================
  containerTag: {
    flexDirection: 'row',
    width: '80%'
  },
  iconTag: {
    marginTop: 3
  },
  txtTagClient: {
    fontFamily: fonts.regular,
    fontSize: metrics.font_small,
    color: '#000',
    marginLeft: 3
  },

  containerPin: {
    width: '20%',
    alignItems: 'center'
  },
  iconPin: {
    color: colors.white_pattern,
    padding: 3,
    borderRadius: 20,
    backgroundColor: colors.red_check
  },
  iconCheck: {
    color: colors.white_pattern,
    padding: 3,
    borderRadius: 20,
    backgroundColor: colors.green_check
  }
});

export default styles;