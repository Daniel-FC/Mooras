import { StyleSheet } from 'react-native';
import { colors, fonts, metrics, general } from '../../styles';

const styles = StyleSheet.create({
  ...general,

  container: {
    flex: 1
  },

  //=================================BODY=======================================
  elementsContainer: {
    flex: 6,
    backgroundColor: colors.white_pattern,
  },

  //=================================BODY_MODAL=================================
  containerBodyModal: {
    flex: 12,
    backgroundColor: colors.white_pattern,
    alignItems:'center'
  },
  
  //=================================BODY_MODAL=================================
  containerField: {
    flexDirection: 'row',
    width: '90%',
    borderBottomWidth: 1,
    borderColor: colors.grey_pattern,
    marginTop: 5,
  },
  containerIcon: {
    width: '10%',
    alignItems:'center'
  },
  icon: {
    marginTop: 19
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
    color: colors.grey_pattern,
  },

  //=================================NAME_MODAL=================================
  inputName: {
    backgroundColor: colors.white_pattern,
    color: colors.grey_pattern,
    fontFamily: fonts.regular,
    fontSize: metrics.font_x_large,
    borderRadius: 7,
    padding: 10,
  },

  //=================================NAME_BIRTH=================================
  containerInputBirthLeft: {
    width: '70%',
  },
  containerInputBirthRight: {
    width: '20%',
    alignItems:'flex-end',
    justifyContent: 'center'
  },
  datePicker: {
    width: 30
  },

  //=================================NAME_VALUE_MODAL===========================
  containerNameValue: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 10,
    marginBottom: -15
  },
  txtNameValue: {
    color: colors.grey_pattern,
    fontFamily: fonts.regular,
    fontSize: metrics.font_medium
  },

//=================================TAG_MODAL====================================
  containerFieldTag: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: colors.grey_pattern,
    marginTop: 5,
  },
  containerSelectTag: {
    flexDirection: 'row',
    width: '100%',
  },
  containerSelectedTag: {
    marginTop: -5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  txtTitleSelectedTag: {
    fontFamily: fonts.regular,
  }
});

export default styles;