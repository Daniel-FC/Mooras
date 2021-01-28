import * as React from 'react';
import { View, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert } from 'react-native';
import DatePicker from 'react-native-datepicker';

import { AntDesign, Entypo, Ionicons, FontAwesome, FontAwesome5  } from '@expo/vector-icons';

import ClientsList from '../../components/ClientsList';

import styles from './styles';
import { colors, metrics } from '../../styles';
import { deletedSearchTagCategory, searchTagCategory, addTagCategory, maskPhone, maskCurrency, maskBirth } from '../../utils';

export default function ClientsScreen() {
  const [open, setOpen] = React.useState(false);
  const [client, setClient] = React.useState([
    {key: 'a', name: 'Angelica', value: '50,00', tag: 'Salão Central', phone: '(84) 9 9876-5432', adress:'aaa', birth: '01/01/2000'},
    {key: 'b', name: 'Bernado', value: '21,50', tag: 'Salão Central', phone: '(84) 9 9876-5432', adress:'aaa', birth: '01/01/2000'},
    {key: 'c', name: 'Calorta', value: '88,00', tag: 'Detran', phone: '(84) 9 9876-5432', adress:'aaa', birth: '01/01/2000'},
    {key: 'd', name: 'Daniel', value: '0,00', tag: 'Detran, Família', phone: '(84) 9 9876-5432', adress:'aaa', birth: '01/01/2000'},
    {key: 'e', name: 'Eugênio', value: '999,00', tag: 'Lanchonete', phone: '(84) 9 9876-5432', adress:'aaa', birth: '01/01/2000'},
    {key: 'f', name: 'Fatima', value: '60,00', tag: 'Família', phone: '(84) 9 9876-5432', adress:'aaa', birth: '01/01/2000'},
    {key: 'g', name: 'Gilvan', value: '0,00', tag: 'Família', phone: '(84) 9 9876-5432', adress:'aaa', birth: '01/01/2000'},
    {key: 'h', name: 'Hosana', value: '0,00', tag: 'Família', phone: '(84) 9 9876-5432', adress:'aaa', birth: '01/01/2000'},
  ]);
  const [idClient, setIdClient] = React.useState(0);
  const [filterTag, setFilterTag] = React.useState([]);
  const [selectTag, setSelectTag] = React.useState('');
  
  const [inputName, setInputName] = React.useState('');
  const [inputValue, setInputValue] = React.useState('');
  const [inputPhone, setInputPhone] = React.useState('');
  const [inputAdress, setInputAdress] = React.useState('');
  const [inputBirth, setInputBirth] = React.useState('');
  const [inputTag, setInputTag] = React.useState('');

  let tagClient = [
    {key: 'Detran'},
    {key: 'Fam'},
    {key: 'Famd'},
    {key: 'Famígla'},
    {key: 'Família'},
    {key: 'Lanchonete'},
    {key: 'Salão Central'},
  ];
  let nonSearch = [];

  //*=====THIS FUNCTION CREATES A CUSTOMER BY CLICKING THE BUTTON=============*/
  function confirmButtonModal() {
    if(inputName === ''){
      Alert.alert(
        'Alerta', 'Nome do cliente em branco',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      );
      return;
    }
    let valueCurrency = inputValue;
    if(inputValue.length<=2) {
      valueCurrency = inputValue + ',00';
    }
    if(inputValue.length==0) {
      valueCurrency = inputValue + '0,00';
    }

    const data = {
      key: idClient,
      name: inputName,
      value: valueCurrency,
      phone: inputPhone,
      adress: inputAdress,
      birth: inputBirth,
      tag: inputTag
    };
    setClient([...client, data]);
    setIdClient(idClient+1);
    closeModal()
  }
  function closeModal(){
    setOpen(false);
    
    setInputName('');
    setInputValue('');
    setInputPhone('');
    setInputAdress('');
    setInputBirth('');
    setInputTag('');
    setSelectTag('');
  }
  /*=====THIS FUNCTION RENDERS THE 'SELECTED' TAGS============================*/
  function renderTag(inputTag) {
    nonSearch = deletedSearchTagCategory(inputTag);
    if(nonSearch.length==1){
      return (
        <View style={styles.containeraSeletedTagCategory}>
          <TouchableOpacity style={styles.containerTagCategory} onPress={ () => removeTag(nonSearch[0].key, inputTag) } > 
            <Text style={styles.txtSelectedTagCategory}> {nonSearch[0].key} </Text> 
          </TouchableOpacity>
        </View>
      )
    }
    if(nonSearch.length==2){
      return (
        <View style={styles.containeraSeletedTagCategory}>
          <TouchableOpacity style={styles.containerTagCategory} onPress={ () => removeTag(nonSearch[0].key, inputTag) } > 
            <Text style={styles.txtSelectedTagCategory}> {nonSearch[0].key} </Text> 
          </TouchableOpacity>
          <Text> </Text>
          <TouchableOpacity style={styles.containerTagCategory} onPress={ () => removeTag(nonSearch[1].key, inputTag) } > 
            <Text style={styles.txtSelectedTagCategory}> {nonSearch[1].key} </Text> 
          </TouchableOpacity>
        </View>
      )
    }
  }

  /*=====THIS FUNCTION FILTERS TAGS===========================================*/
  function searchTag (value) {
    setFilterTag(searchTagCategory(value, inputTag, tagClient));
    setSelectTag(value);
  }

  /*=====THIS FUNCTION REMOVES 'SELECTED' TAGS FROM SEARCH====================*/
  function deletedSearch() {
    nonSearch = deletedSearchTagCategory(inputTag);
  }

  /*=====THIS FUNCTION ADD THE TAG IN 'SECTIONS'==============================*/
  function addTag(value) {
    setInputTag(addTagCategory(value, inputTag));
    setFilterTag([]);
    setSelectTag('');
    deletedSearch();
  }

  /*=====THIS FUNCTION EXCLUDES 'SELECTED' TAGS===============================*/
  function removeTag(value) {
    let control=0;
    let tempInputTag = '';
    for(let i=0; i<inputTag.length; i++){
      if(control>=0){
        for(let j=0, control=0; j<value.length; j++){
          if(value[j]==inputTag[i+j]){
            control++;
          }
          if (control == value.length && inputTag[i+j+1]==';' && inputTag[i+j+2]==' ' && inputTag[i+j+3]==' '){
            for(let k=0; k<inputTag.length; k++){
              if(k<i || k>i+j+3){
                tempInputTag = tempInputTag + inputTag[k];
              }
            }
            control=-1;
          }
        }
      }
    }
    setInputTag(tempInputTag);
  }

  return (
    <SafeAreaView style={styles.container}>
      {/*=============================HEADER=================================*/}
      <View style={styles.containerHeader_primary}>     
        {/*=============================OPTIONS==============================*/}
        <View style={styles.containerOptions_primary}>
          {/*=============================ORDER==============================*/}
          <View style={styles.containerOrder_primary}>
            <TouchableOpacity style={styles.btnSelectOrderType_primary}>
              <Text style={styles.orderType_primary}>Alfabetica</Text>
              <Ionicons name="ios-arrow-down" size={metrics.sizeIcon} color={colors.white_pattern} style={styles.iconArrowDown_primary}/>
            </TouchableOpacity>
          </View>
          
          {/*=============================FILTERS============================*/}
          <View style={styles.filtersContainer_primary}>
            <TouchableOpacity style={styles.btnFilters_primary}>
              <Entypo name="magnifying-glass" size={metrics.sizeIcon} color={colors.white_pattern}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFilters_primary}>
              <AntDesign name="filter" size={metrics.sizeIcon} color={colors.white_pattern}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnFilters_primary}>
              <Ionicons name="md-more" size={metrics.sizeIcon} color={colors.white_pattern}/>
            </TouchableOpacity>
          </View>
        </View>

        {/*=============================ADD_CLIENTE==========================*/}
        <View style={styles.containerAddClient_primary}>
          <TouchableOpacity onPress={ () => setOpen(true) }>
            <Ionicons name="ios-add-circle" size={metrics.sizeIcon*2} color={colors.white_pattern}/>
          </TouchableOpacity>
        </View>
      </View> 

      {/*=============================BODY===================================*/}      
      <View style={styles.elementsContainer}>
        <FlatList 
          marginHorizontal={10}
          showsVerticalScrollIndicator ={false}
          showsHorizontalScrollIndicator={false}
          data={client}
          keyExtractor={ (item) => String(item.key) }
          renderItem={ ({ item }) => <ClientsList data={item} /> }
        />
      </View>

      {/*=============================MODAL==================================*/}
      <Modal animationType="slide" transparent={false} visible={open}>
        <ScrollView style={styles.container}>

          {/*=============================HEADER_MODAL=======================*/}
          <View style={styles.containerHeader_secondary}>
            <View style={styles.header_secondary}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ () => closeModal() }>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_pattern} />
              </TouchableOpacity>
              <Text style={styles.txtHeader}>Novo cliente</Text>
            </View>        
          </View>

          {/*=============================BODY_MODAL=========================*/}
          <View style={styles.containerBodyModal}>
            
            {/*=============================NAME_MODAL=======================*/}
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <Ionicons name="md-person" size={metrics.sizeIcon} color={colors.grey_pattern} style={styles.icon}/>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                placeholder="Nome do cliente"
                style={styles.inputName}
                autoCorrect={false}
                value={inputName}
                onChangeText={ (texto) => setInputName(texto) }
                />
              </View>
            </View>

          {/*=============================VALUE_MODAL======================*/}
          <View style={styles.containerNameValue}>
              <Text style={styles.txtNameValue}>Valor inicial</Text>
            </View>

            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome name="dollar" size={metrics.sizeIcon} color={colors.grey_pattern} style={styles.icon}/>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                keyboardType='numeric'
                placeholder='0,00'
                style={styles.input}
                autoCorrect={false}
                value={inputValue}
                onChangeText={ (texto) => setInputValue(maskCurrency(texto)) }
                />
              </View>
            </View>

            {/*=============================PHONE_MODAL======================*/}
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome name="phone" size={metrics.sizeIcon} color={colors.grey_pattern} style={styles.icon}/>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                keyboardType='phone-pad'
                textContentType='telephoneNumber'
                placeholder='Telefone'
                maxLength={14}
                style={styles.input}
                autoCorrect={false}
                value={inputPhone}
                onChangeText={ (texto) => setInputPhone(maskPhone(texto))}
                />
              </View>
            </View>

            {/*=============================ADRESS_MODAL=====================*/}
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome name="home" size={metrics.sizeIcon} color={colors.grey_pattern} style={styles.icon}/>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                multiline={true}
                placeholder='Endereço'
                style={styles.input}
                autoCorrect={false}
                value={inputAdress}
                onChangeText={ (texto) => setInputAdress(texto) }
                />
              </View>
            </View>

            {/*=============================BIRTH_MODAL======================*/}
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome5 name="calendar-alt" size={metrics.sizeIcon} color={colors.grey_pattern} style={styles.icon}/>
              </View>
              <View style={styles.containerInputBirthLeft}>
                <TextInput
                keyboardType='numeric'
                placeholder='Nascimento'
                maxLength={10}
                style={styles.input}
                autoCorrect={false}
                value={inputBirth}
                onChangeText={ (texto) => setInputBirth(maskBirth(texto))}
                />
              </View>
              <View style={styles.containerInputBirthRight}>
                <DatePicker
                format="DD/MM/YYYY"
                style={styles.datePicker}
                date={inputBirth}
                onDateChange={(texto) => setInputBirth(texto)}
                />
              </View>
            </View>     

            {/*=============================TAG_MODAL========================*/}
            <View style={styles.containerFieldTag}>
              <View style={styles.containerSelectTag}>
                <View style={styles.containerIcon}>
                  <AntDesign name="tago" size={metrics.sizeIcon} color={colors.grey_pattern} style={styles.icon}/>
                </View>
                <View style={styles.containerInput}>
                  <TextInput
                  placeholder="Tag"
                  style={styles.input}
                  autoCorrect={false}
                  value={selectTag}
                  onChangeText={ (texto) => searchTag(texto) }
                  />
                </View>
              </View>
              
              <View style={styles.containerSelectedTag}>
                <Text style={styles.txtTitleSelectedTag}>Selecionado(s): </Text>
                {renderTag(inputTag)}
              </View>

              <View style={styles.containerFlatList}>
                <FlatList 
                  marginHorizontal={10}
                  showsVerticalScrollIndicator ={false}
                  showsHorizontalScrollIndicator={false}
                  data={filterTag}
                  keyExtractor={ (item) => String(item.key) }
                  renderItem={ ({ item }) => { return (
                    <View style={styles.containerList}>
                      <TouchableOpacity style={styles.containerListNameTagCategory} onPress={ () => addTag(item.key) } >
                        <Text style={styles.txtListNameTagCategory}>{item.key}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
                />
              </View>
            </View>

            {/*=============================CONFIRM_BUTTON_MODAL=============*/}
            <TouchableOpacity style={styles.btnConfirm} onPress={ confirmButtonModal }>
              <AntDesign name={"check"} size={metrics.sizeIcon} color={colors.white_pattern} />
            </TouchableOpacity> 

          </View>
        </ScrollView>
      </Modal>
    </SafeAreaView>
  );
}
