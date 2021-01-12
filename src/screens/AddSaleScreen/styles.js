import { StyleSheet } from 'react-native';
import { colors, fonts, metrics, general } from '../../styles';

const styles = StyleSheet.create({
  ...general,

  container: {
    flex: 1
  },

  //=================================BODY=======================================
  containerBody: {
    flex: 12,
    backgroundColor: colors.white_pattern,
    alignItems:'center'
  },
  containerField: {
    flexDirection: 'row',
    width: '90%',
    borderBottomWidth: 1,
    borderColor: colors.grey_pattern,
    marginBottom: 5,
  },
  containerIcon: {
    width: '10%',
    alignItems:'center'
  },
  icon: {
    marginTop: 19
  },
  iconValue: {
    marginTop: 22
  },
  containerInput: {
    width: '90%'
  },
  input: {
    backgroundColor: colors.white_pattern,
    marginTop: 7,
    marginBottom: 7,
    color: colors.grey_pattern,
    fontFamily: fonts.regular,
    fontSize: metrics.font_medium,
    borderRadius: 7,
    padding: 10,
    color: colors.grey_pattern
  },

  //=================================NAME_VALUE=================================
  containerNameValue: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 20
  },
  txtNameValue: {
    color: colors.grey_pattern,
    fontFamily: fonts.regular,
    fontSize: metrics.font_medium
  },

  //=================================VALUE======================================
  inputValue: {
    backgroundColor: colors.white_pattern,
    color: colors.grey_pattern,
    fontFamily: fonts.regular,
    fontSize: metrics.font_x_large,
    borderRadius: 7,
    padding: 10,
  },

  //=================================RECEIVED===================================
  containerReceived: {
    width: '90%',
    flexDirection: 'row',
    alignItems:'center'
  },
  received: {
    width: '85%'
  },
  switch: {
    alignItems:'center',
    justifyContent: 'center',
    width: '15%'
  },

  //=================================PRODUCT====================================
  containerButtons: {
    width: '90%',
    flexDirection: 'row',
    alignItems:'center',
    marginTop: 7,
    marginBottom: 7
  },

  //=================================DATE=======================================
  btnDateSelected: {
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.green_pattern,
    marginBottom: 10,
    color: colors.grey_pattern,
    fontFamily: fonts.regular,
    fontSize: metrics.font_medium,
    borderRadius: 30,
    padding: 10
  },
  btnDate: {
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.grey_check,
    marginBottom: 10,
    color: colors.grey_pattern,
    fontFamily: fonts.regular,
    fontSize: metrics.font_medium,
    borderRadius: 30,
    padding: 10
  },
  txtDateSelected: {
    color: colors.white_pattern,
    fontFamily: fonts.bold
  },
  txtDate: {
    color: colors.black_pattern,
    fontFamily: fonts.regular
  }
});

export default styles;