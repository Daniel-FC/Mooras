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
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  orderType_primary: {
    color: colors.white_standard,
    fontWeight: 'bold',
    fontSize: metrics.font_medium,
  },
  iconArrowDown_primary: {
    marginTop: 4,
    marginLeft: 5
  },
  btnFilters_primary: {
    marginRight: 7,
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerTitle_withButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
  },
  headerTitle_buttons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '40%',
  },

  containerLineTwo: {
    flex: 2,
    marginLeft: metrics.margin,
    marginRight: metrics.margin,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnAdd: {
    width: 35,
    height: 35,
    backgroundColor: colors.white_standard,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.grey_standard,
    borderWidth: 1,
   },
   iconButtonAdd:{
    color: colors.grey_standard,
    fontSize: 25,
    fontWeight: 'bold',
   },

   containerSort: {
    backgroundColor: colors.white_standard,
    width: 228,
    borderRadius: 5,
    borderLeftColor: colors.grey_standard,
    borderTopColor: colors.grey_standard,
    borderRightColor: colors.black_standard,
    borderBottomColor: colors.black_standard,
    borderWidth: 1,
    opacity: 0.95,
  },
  btnSort: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 3,
    marginBottom: 3,
  },
  txtSortButton: {
    fontSize: metrics.font_x_small,
    color: colors.black_standard,   
  },

  txtNameItem: {
    fontWeight: 'bold',
    fontSize: metrics.font_medium,
    color: colors.black_standard,
  },
  txtTagCategoryItem: {
    fontSize: metrics.font_small,
    color: colors.black_standard,
    marginLeft: 3
  },
  valueClientPin: {
    color: colors.red_icon,
  },
  valueClientCheck: {
    color: colors.green_icon,
  },
  containerPin: {
    width: '100%',
    alignItems: 'center'
  },
  iconPin: {
    color: colors.white_standard,
    padding: 3,
    borderRadius: 20,
    backgroundColor: colors.red_icon,
  },
  iconCheck: {
    color: colors.white_standard,
    padding: 3,
    borderRadius: 20,
    backgroundColor: colors.green_icon,
  },
  iconTrash: {
    color: colors.white_standard,
    padding: 3,
    borderRadius: 30,
    backgroundColor: colors.red_standard,
  },

  containerSearch: {
    backgroundColor: colors.blue_standard, 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSearchProduct: {
    marginTop: 5,
    marginBottom: 15,
    width: '70%',
    borderRadius: 7,
    backgroundColor: colors.white_standard,
    color: colors.black_standard,
    fontSize: metrics.font_x_small,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputSearchProductEmpty: {
    marginTop: 5,
    marginBottom: 15,
    width: '60%',
    borderRadius: 7,
    backgroundColor: colors.white_standard,
    color: colors.black_standard,
    fontSize: metrics.font_x_small,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },

  btnConfirmFilters: {
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.blue_standard,
  },
  btnSituation: {
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.grey_standard,
    marginBottom: 10,
    color: colors.grey_standard,
    fontSize: metrics.font_medium,
    borderRadius: 30,
    padding: 10
  },
  btnSituationSelectedB: {
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.blue_standard,
    marginBottom: 10,
    color: colors.blue_standard,
    fontSize: metrics.font_medium,
    borderRadius: 30,
    padding: 10
  },
  btnSituationSelectedG: {
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.green_icon,
    marginBottom: 10,
    color: colors.green_icon,
    fontSize: metrics.font_medium,
    borderRadius: 30,
    padding: 10
  },
  btnSituationSelectedR: {
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.red_icon,
    marginBottom: 10,
    color: colors.red_icon,
    fontSize: metrics.font_medium,
    borderRadius: 30,
    padding: 10
  },
  txtFilter: {
    color: colors.white_standard,
  },
  txtFilterSelected: {
    color: colors.white_standard,
    fontWeight: 'bold',
  },
  txtFilterBlack: {
    color: colors.black_standard,
  },
  btnTag: {
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
  btnTagSelected: {
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.blue_standard,
    marginBottom: 10,
    color: colors.blue_standard,
    fontSize: metrics.font_medium,
    borderRadius: 30,
    padding: 10,
  },

  containerInputBirthLeft: {
    width: '75%',
  },
  containerInputBirthRight: {
    width: '15%',
    alignItems:'center',
    justifyContent: 'center',
  },
  datePicker: {
    width: 30
  },
  btnTagSelectedGreen: {
    marginLeft: 3,
    marginRight: 3,
    backgroundColor: colors.green_standard,
    marginBottom: 10,
    color: colors.blue_standard,
    fontSize: metrics.font_medium,
    borderRadius: 30,
    padding: 10,
  },

  lineHorizontal: {
    borderTopWidth: 1, 
    borderTopColor: '#7acdcb',
  },

  clientHeaderModalOne: {
    flexDirection: 'row',
    height: 30,
    marginLeft: 15,
    marginRight: 15,
  },
  clientHeaderModalTwo: {
    flexDirection: 'row',
    height: 60,
    marginLeft: 15,
    marginRight: 15,
  },
  titleTxtModal: {
    fontWeight: 'bold',
    color: colors.white_standard,
  },
  containerTag: {
    marginBottom: 5,
    borderRadius: 30,
    borderColor: colors.white_standard,
    borderWidth: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerInitialValue: {
    height: 35, 
    marginLeft: metrics.margin,
    marginRight: metrics.margin,
    flexDirection: 'row',
  },
  txtInitialValue: {
    height: 35,
    borderRightWidth: 1, 
    borderRightColor: '#d89ca1',
    width: '77%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  initialValue: {
    height: 35,
    width: '23%',
    justifyContent: 'center',
  },
});
 
export default styles
