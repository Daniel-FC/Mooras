import * as React from 'react';
import { View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { maskAccentuation } from './masks';

/*=======THIS FUNCTION FILTERS TAGS===========================================*/
function searchTagCategory(value, inputTag, tagClient) {
  let temp = [];
  let nonSearch = deletedSearchTagCategory(inputTag);
  if(value.length>1){
    for(let i=0; i<tagClient.length; i++) {
      let control=0;
      for(let j=0; j<nonSearch.length; j++) {
        if(tagClient[i].key==nonSearch[j].key)
          control=1;
      }
      if(control==0){
        let tam = value.length;
        if(tagClient[i].key.length<tam)
          tam = tagClient[i].length;
        for(let j=0; j<tam; j++) {
          let a = maskAccentuation(tagClient[i].key[j]);
          let b = maskAccentuation(value[j]);
          if(a==b)
            control++;
          else
            break;
        }
        if(control==tam)
          temp.push(tagClient[i]); 
      }
    }
  }
  return temp;
}

/*=======THIS FUNCTION REMOVES 'SELECTED' TAGS FROM SEARCH====================*/
function deletedSearchTagCategory(inputTag) {
  let nonSearch = [];
  let tagTemp = '';
  for(let i=0; i<inputTag.length; i++) {
    tagTemp = tagTemp + inputTag[i];
    if(inputTag[i+1]==';' && inputTag[i+2]==' ' && inputTag[i+3]==' '){
      const data = {
        key: tagTemp,
      }
      tagTemp = '';
      i = i+3;
      nonSearch.push(data);
    }
  }
  return nonSearch;
}

/*=======THIS FUNCTION ADD THE TAG IN 'SECTIONS'==============================*/
function addTagCategory(value, inputTag) {
  let sum = 0;
  for(let i=0; i<inputTag.length; i++) {
    if(inputTag[i+1]==';' && inputTag[i+2]==' ' && inputTag[i+3]==' '){
      sum++;
      i = i+3;
    }
  }
  if(sum<2){
    value = value + ";  ";
    value = inputTag + value;
  }
  else {
    value = inputTag;
    Alert.alert(
      'Alerta', "Atingiu a quantidade máxima de tag's permitidas",
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
    );
  }
  return value;
}

export { deletedSearchTagCategory, searchTagCategory, addTagCategory };
