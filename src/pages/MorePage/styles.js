import { StyleSheet } from 'react-native';
import { colors, metrics, general } from '../../styles';
 
const styles = StyleSheet.create({
  ...general,

  container: { 
    flex: 1,
    backgroundColor: '#dddddd',
  },

  containerHeader_More: {
    backgroundColor: '#dddddd',
    flex: 1,
  },

  containerLineOne: {
    flex: 1,
    marginLeft: metrics.margin,
    marginRight: metrics.margin,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  containerLineTwo: {
    flex: 2,
    marginLeft: metrics.margin,
    marginRight: metrics.margin,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  txtRegularBlack: {
    fontSize: metrics.font_x_small,
    color: colors.black_standard,
  },
  txtBoldBlack: {
    fontSize: metrics.font_medium,
    color: colors.black_standard,
    fontWeight: 'bold',
  },

  containerBody_More: {
    flex: 6,
    backgroundColor: colors.white_standard,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },

  containerElements: {
    flexDirection: 'row',
    marginLeft: metrics.margin,
    marginRight: metrics.margin,
    borderRadius: 7,
    padding: 7,
    marginTop: 5,
    borderBottomWidth: 1,
    borderColor: colors.grey_standard,
  },
  containerIcon: {
    width: '10%', 
    alignItems:'center', 
    justifyContent: 'center',
  },
  containerTitleMenu: {
    width: '90%',
    alignItems:'flex-start',
    justifyContent: 'center',
    marginLeft: 5,
  },
  txtBoldGray: {
    fontSize: metrics.font_medium,
    color: colors.grey_standard,
    fontWeight: 'bold',
  },

  containerTagsCategorys: {
    flex: 1, 
    marginLeft: metrics.margin,
    marginRight: metrics.margin, 
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerTxtTagCategorys: {
    alignItems: 'flex-start',
    width: '80%',
    borderRadius: 7,
    padding: 7,
    marginTop: 5,
  },
  txtTagCategory: {
    fontSize: metrics.font_medium,
    color: colors.grey_standard,
    fontWeight: 'bold',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey_standard,
  },
  containerIconTagCategory: {
    width: '20%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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

   containerModalAdd:{
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    backgroundColor: '#4c4c4c',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
   },
   input: {
    width: '90%',
    borderRadius: 7,
    padding: 10,
    fontSize: metrics.font_medium,
    borderBottomWidth: 1,
    color: 'white',
    borderColor: colors.white_standard,
  },
  containerModalAddTitle: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
  },
  containerModalAddInput: {
    flex: 2,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
  containerModalAddButtons: {
    flex: 2,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnModalAddCancel: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c4c4c',
    borderColor: colors.green_standard,
    borderWidth: 1,
    width:'49%',
    padding: 10,
    borderRadius: 20,
  },
  btnModalAddConcluido: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green_standard,
    borderColor: colors.green_standard,
    borderWidth: 1,
    width:'49%',
    padding: 10,
    borderRadius: 20,
  },
});
 
export default styles
