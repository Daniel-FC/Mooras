import colors from './colors';
import metrics from './metrics';

const general = {
  txtBoldWhite: {
    fontSize: metrics.font_x_small,
    color: colors.white_standard,
    fontWeight: 'bold',
  },
  txtBoldBlack: {
    fontSize: metrics.font_x_small,
    color: colors.black_standard,
    fontWeight: 'bold',
  },

  containerHeader_primary: {
    backgroundColor: colors.blue_standard,
    flex: 1,
  },
  btnMenu: {
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerBody_primary: {
    flex: 6,
    backgroundColor: colors.white_standard,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  
  containerModalBlue: { 
    flex: 1,
  },
  containerModal: { 
    flex: 1,
    backgroundColor: colors.green_standard,
  },
  containerModalWhite: { 
    flex: 1,
    backgroundColor: colors.white_standard,
  },
  containerHeader_secondary: {
    backgroundColor: colors.green_standard,
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  containerHeader_secondaryRounded: {
    backgroundColor: colors.green_standard,
    height: 75,
    justifyContent: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  containerHeader_secondaryBlue: {
    backgroundColor: colors.blue_standard,
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  headerTitle_secondaryFull: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 2,
  },
  headerTitle_secondary: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  headerButton_secondary: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerFake_secondary: {
    width: '45%',
  },
  btnReturn_secondary: {
    padding: 10,
  },
  txtHeader: {
    color: colors.white_standard,
    fontWeight: 'bold',
    fontSize: metrics.font_medium,
  },
  containerBodyModalFilter: {
    flex: 6,
    backgroundColor: colors.white_standard,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  containerBodyModal: {
    flex: 1,
    backgroundColor: colors.white_standard,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  containerBodyAddModal: {
    flex: 1,
    backgroundColor: colors.white_standard,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems:'center',
  },

  btnItemFlatList: {
    width:'100%',
    flexDirection: 'row',
  },

  containerField: {
    flexDirection: 'row',
    width: '90%',
    borderBottomWidth: 1,
    borderColor: colors.grey_standard,
    marginTop: 5,
  },
  containerFieldPay: {
    flexDirection: 'row',
    width: '90%',
    borderBottomWidth: 1,
    borderColor: colors.grey_standard,
    marginTop: -20,
  },
  containerFieldSwitch: {
    flexDirection: 'row',
    width: '90%',
    borderColor: colors.grey_standard,
    marginTop: 5,
  },
  containerFieldFlat: {
    width: '90%',
    borderBottomWidth: 1,
    borderColor: colors.grey_standard,
    marginTop: 5,
  },
  containerSelectFlat: {
    flexDirection: 'row',
    width: '100%',
  },
  containerIcon: {
    width: '10%',
    alignItems:'center'
  },
  icon: {
    marginTop: 19
  },
  containerInput: {
    width: '90%',
  },
  containerInputFlatAndRow: {
    width: '90%',
    flexDirection: 'row',
  },
  input: {
    backgroundColor: colors.white_standard,
    marginTop: 7,
    marginBottom: 7,
    color: colors.grey_standard,
    fontSize: metrics.font_medium,
    borderRadius: 7,
    padding: 10,
    color: colors.grey_standard,
  },
  inputProduct: {
    backgroundColor: colors.white_standard,
    marginTop: 7,
    marginBottom: 7,
    color: colors.grey_standard,
    fontSize: metrics.font_medium,
    borderRadius: 7,
    padding: 10,
    color: colors.grey_standard,
    width: '55%',
  },
  inputQuantity: {
    backgroundColor: colors.white_standard,
    marginTop: 7,
    marginBottom: 7,
    color: colors.grey_standard,
    fontSize: metrics.font_medium,
    borderRadius: 7,
    padding: 10,
    color: colors.grey_standard,
    width: '22%',
  },
  inputName: {
    backgroundColor: colors.white_standard,
    color: colors.grey_standard,
    fontSize: metrics.font_x_large,
    borderRadius: 7,
    padding: 10,
  },
  inputSelect: {
    color: colors.grey_standard,
    fontSize: metrics.font_medium,
    marginTop: 7,
    marginBottom: 7,
    padding: 10,
  },
  containerTitleValue: {
    flexDirection: 'row',
    width: '90%',
    marginTop: 10,
    marginBottom: -13
  },
  txtTitleValue: {
    color: colors.grey_standard,
    fontSize: metrics.font_medium,
  },
  btnConfirm: {
    marginTop: 20,
    backgroundColor: colors.green_standard,
    height: 45,
    width: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerSelectedFlat: {
    marginTop: -5,
    marginBottom: 5,
    flexDirection: 'row',
  },
  containerFlatList: {
    marginBottom: 5,
  },
};

export default general;
