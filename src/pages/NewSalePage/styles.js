import { StyleSheet } from 'react-native';
import { colors, metrics, general } from '../../styles';
 
const styles = StyleSheet.create({
  ...general,

  container: { 
    flex: 1,
  },

  btnSaleSelectedLeft: {
    width: '48%', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: colors.green_standard,
    height: 40,
    
    borderColor: 'black',
    borderWidth: 1,
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 10,
  },
  btnSaleSelectedRight: {
    width: '48%', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: colors.green_standard,
    height: 40,
    
    borderColor: 'black',
    borderWidth: 1,
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderRadius: 10,
  },
  btnSaleUnselected: {
    width: '48%', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: colors.grey_icon,
    height: 40,

    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },

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

  containerButtons: {
    width: '50%',
    flexDirection: 'row',
    alignItems:'center',
    marginTop: 7,
    marginBottom: 7,
  },
  btnDateSelected: {
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.green_standard,
    marginBottom: 10,
    color: colors.grey_standard,
    borderRadius: 30,
    padding: 10,
    flexDirection: 'row',
  },
  btnDate: {
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.grey_icon,
    marginBottom: 10,
    color: colors.grey_standard,
    borderRadius: 30,
    padding: 10,
    flexDirection: 'row',
  },
  txtDateSelected: {
    color: colors.white_standard,
    fontWeight: 'bold',
  },
  txtDate: {
    color: colors.white_standard,
  },

  containerInputBirthLeft: {
    width: '70%',
  },
  containerInputBirthRight: {
    width: '20%',
    alignItems:'flex-end',
    justifyContent: 'center'
  },
  datePicker: {
    position: 'absolute',
    width: 80,
  },
  datePicker2: {
    width: 30,
  },

  txtFlatSelected: {
    width: '80%',
    marginTop: 8,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 10,
    color: 'red',
    fontSize: metrics.font_medium,
    borderRadius: 30,
    padding: 10,
    borderColor: colors.grey_standard,
    borderWidth: 1,
  },
  btnItem: {
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 10,
    color: 'red',
    fontSize: metrics.font_medium,
    borderRadius: 30,
    padding: 10,
    borderColor: colors.grey_standard,
    borderWidth: 1,
  },
  txtFilterBlack: {
    color: colors.black_standard,
  },

  containerProducts: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: colors.grey_standard,
  },
  containerFieldProduct: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 5,
  },
  containerFieldProduct2: {
    flexDirection: 'row',
    width: '100%',
    marginTop: -10,
  },
});
 
export default styles
