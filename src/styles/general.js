import colors from './colors';
import { fonts }  from './fonts';
import metrics from './metrics';

const general = {
  circularButton: {
    position: 'absolute',
    height: 50,
    width: 50,
    backgroundColor: colors.blue_pattern,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  //===============================BUTTONS======================================
  txtBoldWhite: {
    fontSize: metrics.font_x_small,
    color: colors.white_pattern,
    fontFamily: fonts.bold
  },
  btnConfirm: {
    marginTop: 20,
    backgroundColor: colors.green_pattern,
    height: 45,
    width: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  //===============================PRIMARY======================================
  containerHeader_primary: {
    backgroundColor: colors.blue_pattern,
    flex: 1
  },
  containerOptions_primary: {
    width: '100%',
    flexDirection: 'row'
  },
  containerOrder_primary: {
    width: '70%',
  },
  btnSelectOrderType_primary: {
    flexDirection: 'row',
  },
  orderType_primary: {
    color: colors.white_pattern,
    fontFamily: fonts.bold,
    fontSize: metrics.font_medium,
    marginLeft: 20
  },
  iconArrowDown_primary: {
    marginTop: 4,
    marginLeft: 5
  },
  filtersContainer_primary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  btnFilters_primary: {
    marginRight: 7,
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerAddClient_primary: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    flex: 1
  },

  //===============================SECONDARY====================================
  containerHeader_secondary: {
    backgroundColor: colors.green_pattern,
    height: 60,
    justifyContent: 'center'
  },
  header_secondary: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnReturn_secondary: {
    padding: 10
  },
  txtHeader: {
    color: colors.white_pattern,
    fontFamily: fonts.bold,
    fontSize: metrics.font_medium
  },

  //===============================FLAT_LIST_ADD_TAG/CATEGORY===================

  containeraSeletedTagCategory: {
    flexDirection: 'row',
  },
  containerTagCategory: {
    alignItems: 'center'
  },
  txtSelectedTagCategory: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey_pattern,
    fontFamily: fonts.regular,
  },
  containerFlatList: {
    marginBottom: 5,
  },
  containerList: {
    margin: 2,
    borderRadius: 15,
    padding: 3,
    backgroundColor: colors.grey_pattern
  },
  containerListNameTagCategory: {
    alignItems: 'center'
  },
  txtListNameTagCategory: {
    fontFamily: fonts.bold,
    fontSize: metrics.font_small,
    color: colors.white_pattern,
  }
};

export default general;
