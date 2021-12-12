import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, FlatList, Modal, Alert, Switch } from 'react-native';

import { Ionicons, Entypo, AntDesign, FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';

import AuthContext from '../../contexts/auth';
import styles from './styles';
import { colors, metrics } from '../../styles';
import { sortItens, searchItens, filterItensByClients, maskPhone, maskCurrency, maskDate, validateDate } from '../../utils';

export default function ClientsPage({ navigation, route }) {
  const { clientList, nextClientId, tagList, changeClientList, deleteClientList, transactionList, deleteTransactionList } = useContext(AuthContext);

  const [showClient, setShowClient] = useState([]);
  const [showSearchClients, setShowSearchClients] = useState([]);
  const [showFilterClients, setShowFilterClients] = useState([]);

  const [typeSort, setTypeSort] = useState(0);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [sortTxt, setSortTxt] = useState("");

  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterSituation, setFilterSituation] = useState(0);
  const [filterTags, setFilterTags] = useState([]);
  const [randomColors, setRandomColors] = useState([]);

  const [openAddClientModal, setOpenAddClientModal] = useState(false);
  const [inputName, setInputName] = React.useState('');
  const [inputValue, setInputValue] = React.useState(0);
  const [inputPhone, setInputPhone] = React.useState('');
  const [inputAddress, setInputAddress] = React.useState('');
  const [inputBirth, setInputBirth] = React.useState('');
  const [isSwitchEnabled, setSwitch] = useState(false);
  const [inputTag, setInputTag] = React.useState('');

  const [openClientModal, setOpenClientModal] = useState(false);
  const [showTransactionsClient, setShowTransactionsClient] = useState([]);
  const [clientSelected, setClientSelected] = useState([]);

  const [openClientHeaderModal, setOpenClientHeaderModal] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(()=> {
    sortClients(typeSort);
  }, [clientList, showSearchClients, showFilterClients]);

  function sortClients(ts) {
    setTypeSort(ts);
    setOpenSortModal(false);

    if(searchTxt == '' && filterSituation == 0 && filterTags == 0) {
      setShowClient(sortItens(clientList, ts));
    } else if (searchTxt != '' && filterSituation == 0 && filterTags == 0) {
      setShowClient(sortItens(showSearchClients, ts));
    } else if (searchTxt == '' && (filterSituation != 0 || filterTags != 0)) {
      setShowClient(sortItens(showFilterClients, ts));
    } else {
      let showFilters = showSearchClients.filter( item => showFilterClients.includes(item) );
      setShowClient(sortItens(showFilters, ts));
    }

    if(ts==0) {
      setSortTxt("Alfabética Crescente");
    } else if(ts==1) {
      setSortTxt("Alfabética Decrescente");
    } else if(ts==2) {
      setSortTxt("Maior Valor");
    } else if(ts==3) {
      setSortTxt("Menor Valor");
    }
  }

  function selectColor(value, key) {
    if(value > 0){
      if(key==0){return styles.valueClientPin}
      if(key==1){return "pushpino"}
      if(key==2){return styles.iconPin}
    } else {
      if(key==0){return styles.valueClientCheck}
      if(key==1){return "check"}
      if(key==2){return styles.iconCheck}
    }
  }

  function searchClients(text) {
    setShowSearchClients(searchItens(clientList, text));
    setSearchTxt(text);
  }

  function styleSearchInput() {
    if(searchTxt == ''){
      return styles.inputSearchProduct;
    } else {
      return styles.inputSearchProductEmpty;
    }
  }

  function closeFilterModal() {
    setOpenFilterModal(false);
    if(showFilterClients != 0) {
      setFilterSituation(0);
      setFilterTags([]);
    }
  }

  function filterClients() {
    setShowFilterClients(filterItensByClients(clientList, filterSituation, filterTags));
    setOpenFilterModal(false);
  }

  function styleBtnFilterSituation(origin) {
    if(origin == 0) {
      if(filterSituation == 0) {return styles.btnSituationSelectedB;}
      else {return styles.btnSituation;}
    }
    if(origin == 1) {
      if(filterSituation == 1) {return styles.btnSituationSelectedG;} 
      else {return styles.btnSituation;}
    }
    if(origin == 2) {
      if(filterSituation == 2) {return styles.btnSituationSelectedR;} 
      else {return styles.btnSituation;}
    }    
  }

  function styleTxtFilterSituation(origin) {
    if(origin == filterSituation) {
      return styles.txtFilterSelected;
    } else {
      return styles.txtFilter;
    }
  }

  function styleBtnFilterTag(origin, item) { 
    if(origin == 0) {
      if(filterTags == 0) {return styles.btnTagSelected;}
      else {return styles.btnTag;}
    } else {
      if(filterTags.indexOf(item) == -1) {
        return styles.btnTag;
      } else {
        if(filterTags != 0) { 
          let colorIndex = (tagList.indexOf(item) + 1) / (tagList.length + 1);
          if(randomColors.length != tagList.length) {
            let temp = randomColors.slice()
            temp.push(Math.random());
            setRandomColors(temp);
          }
          let colorRandom = (randomColors[tagList.indexOf(item)] + colorIndex) / 2;
          if(colorRandom == 1) {
            colorRandom -= 0.1;
          }
    
          let btnTag = {
            marginLeft: 3,
            marginRight: 3,
            backgroundColor: "#" + Math.floor(colorRandom * 16777215).toString(16),
            marginBottom: 10,
            color: colors.grey_standard,
            fontSize: metrics.font_medium,
            borderRadius: 30,
            padding: 10
          }
          return btnTag;
        } else {
          return styles.btnTag;
        }
      }
    }
  }

  function styleTxtFilterTag(origin, item) {
    if(origin == filterTags) {
      return styles.txtFilterSelected;
    } else {
      if(filterTags.indexOf(item) == -1){
        return styles.txtFilterBlack;
      } else {
        return styles.txtFilterSelected;
      }
    }
  }

  function selectAllTags() {
    if(filterTags != 0){
      setFilterTags([]);
    }
  }

  function selectTag(item) {
    let temp = filterTags.slice();
    if(filterTags.indexOf(item) == -1) {
      temp.push(item);
    } else {
      temp.splice(temp.indexOf(item), 1);
    }
    setFilterTags(temp);
  }

  function closeAddClientModal() {
    setOpenAddClientModal(false);
    setInputName('');
    setInputValue(0);
    setInputPhone('');
    setInputAddress('');
    setInputBirth('');
    setSwitch(false);
    setInputTag('');
  }

  function styleBtnAddTag(item) {
    if(inputTag == item) {
      return styles.btnTagSelectedGreen;
    }
    return styles.btnTag;
  }

  function styleTxtAddTag(item) {
    if(inputTag == item) {
      return styles.txtFilterSelected;
    }
    return styles.txtFilterBlack;
  }

  function selectAddTag(item) {
    if(inputTag  != item) {
      setInputTag(item);
    } else {
      setInputTag("");
    }
  }

  function addClient() {
    let mensagem = "";
    
    if(inputName === ''){
      mensagem = "Nome do cliente em branco";
    } else if(inputName.length < 3) {
      mensagem = "Nome do cliente deve ter ao menos 3 caracteres";
    }

    if(inputBirth != ''){
      mensagem = validateDate(inputBirth, isSwitchEnabled);
    }

    if(mensagem != "") {
      Alert.alert(
        'Alerta', mensagem,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      );
      return;
    }
    
    let valueCurrency = inputValue;
    if(inputValue.length === undefined || inputValue.length == 0) {
      valueCurrency = "0";
    }
    let initialValue = parseFloat(valueCurrency.replace(",", "."));
    let sumValue = initialValue;
    if(clientSelected != 0) {
      sumValue = clientSelected.sumValue - clientSelected.value + initialValue;
    }

    let client = {
      id: clientSelected == 0 ? nextClientId : clientSelected.id,
      name: inputName,
      value: initialValue,
      sumValue: sumValue,
      phone: inputPhone,
      address: inputAddress,
      birth: inputBirth.replace("/", "-").replace("/", "-"),
      tag: inputTag,
    }
    let clients = clientList.slice();
    let add;
    if(clientSelected == 0) {
      clients.push(client);
      add = true;
    } else {
      clients[clients.indexOf(clientSelected)] = client;
      setClientSelected(client);
      add = false;
    }
    changeClientList(clients, add);
    closeAddClientModal();
  }

  function renderProducts(item) {
    if(item.isSale) {
      if(item.products != 0) {
        return(
          <View style={selectStyle(2, item)}>
            {item.products.length/3>0 ? <Text numberOfLines={1}>{item.products[2]}x {item.products[1]} </Text>: <View></View>}
            {item.products.length/3>1 ? <Text numberOfLines={1}>{item.products[5]}x {item.products[4]} </Text>: <View></View>}
            {item.products.length/3>2 ? <Text numberOfLines={1}>{item.products[8]}x {item.products[7]} </Text>: <View></View>}
            {item.products.length/3>3 ? <Text numberOfLines={1}>{item.products[11]}x {item.products[10]} </Text>: <View></View>}
            {item.products.length/3>4 ? <Text numberOfLines={1}>{item.products[14]}x {item.products[13]} </Text>: <View></View>}
            {item.products.length/3>5 ? <Text numberOfLines={1}>{item.products[17]}x {item.products[16]} </Text>: <View></View>}
            {item.products.length/3>6 ? <Text numberOfLines={1}>{item.products[20]}x {item.products[19]} </Text>: <View></View>}
            {item.products.length/3>7 ? <Text numberOfLines={1}>{item.products[23]}x {item.products[22]} </Text>: <View></View>}
            {item.products.length/3>8 ? <Text numberOfLines={1}>{item.products[26]}x {item.products[25]} </Text>: <View></View>}
            {item.products.length/3>10 ? <Text numberOfLines={1}>{item.products[29]}x {item.products[28]} </Text>: <View></View>}
          </View>
        );
      } else {
        return(
          <View style={selectStyle(2, item)}>
            <Text>1x Produto não informado </Text>
          </View>
        );
      }
    } else {
      return(
        <View style={selectStyle(3, item)}>
          <AntDesign name="check" size={15} style={styles.iconCheck}/>
          <Text> </Text>
        </View>
      );
    }
  }

  function styleTxtAreaView(isSale) {
    let styleTxt = {}
    if(!isSale) {
      styleTxt = {
        fontWeight: 'bold',
        color: colors.green_icon,
      }
    }
    return styleTxt;
  }

  function selectStyle(key, item) {
    let retorno = {};
    let heightCalc = 35;

    if(item != null && item.products.length/3 > 1) {
      heightCalc += ((item.products.length/3)-1)* 19;
    }

    if(key == 1) {
      retorno = {
        height: heightCalc, 
        marginLeft: metrics.margin,
        marginRight: metrics.margin,
        flexDirection: 'row',
      }
    }
    if(key == 2) {
      retorno = {
        height: heightCalc,
        borderRightWidth: 1, 
        borderRightColor: '#d89ca1',
        width: btnVisible ? '59%' : '64%',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }
    }
    if(key == 3) {
      retorno = {
        height: heightCalc,
        borderRightWidth: 1, 
        borderRightColor: '#d89ca1',
        width: btnVisible ? '59%' : '64%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
      }
    }
    if(key == 4) {
      retorno = {
        height: heightCalc,
        width: '23%',
        justifyContent: 'center',
      }
    }
    return retorno;
  }

  function selectClient(client) {
    setOpenClientModal(true);
    setClientSelected(client);

    let temp = [];
    for(let transaction in transactionList) {
      if(client.id == transactionList[transaction].client) {
        temp.push(transactionList[transaction]);
      }
    }
    setShowTransactionsClient(temp);
  }

  function formatDate(transaction) {
    let date = transaction.date.substring(0,5);

    if(date.substring(1,2) == "-") {
      date = "0" + date.substring(0,4);
    }
    date = date.replace("-", "/");
    if(date.substring(4,5) == "-") {
      date = date.substring(0,3) + "0" + date.substring(3, 4);
    }

    return date;
  }

  function closeClientModal() {
    setOpenClientHeaderModal(false);
    setOpenClientModal(false);
    setBtnVisible(false);
    setClientSelected([]);
  }

  function changeVisibility() {
    if(btnVisible) {
      setBtnVisible(false);
    } else {
      setBtnVisible(true);
    }
  }

  function deleteClient() {
    function del() {
      let temp = clientList.slice();
      temp.splice(temp.indexOf(clientSelected), 1);
      deleteClientList(temp, clientSelected);
      closeClientModal();
    }

    Alert.alert(
      "Deletar",
      "Tem certeza que deseja deletar este cliente? ¨" + clientSelected.name + "¨",
      [
        { text: "NÃO", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "SIM", onPress: () => del() },
      ]
    );
  }

  function modifyClient() {
    let valueTreated = clientSelected.value.toString().replace(".", ",");
    let valueParts = valueTreated.split(",");
    if(valueParts.length == 1) {
      valueTreated += ",00";
    } else if(valueParts[1].length == 1) {
      valueTreated += "0";
    }

    setOpenAddClientModal(true);
    setInputName(clientSelected.name);
    setInputValue(valueTreated);
    setInputPhone(clientSelected.phone);
    setInputAddress(clientSelected.address);
    if(clientSelected.birth.length == 5) {
      setInputBirth(clientSelected.birth.replace("-", "/"));
      setSwitch(false);
    } else {
      setInputBirth(clientSelected.birth.replace("-", "/").replace("-", "/"));
      setSwitch(true);
    }
    setInputTag(clientSelected.tag);
  }

  function deleteTransaction(transaction) {
    function del() {
      let temp = transactionList.slice();
      temp.splice(temp.indexOf(transaction), 1);

      let clie = clientList.slice();
      if(transaction.isSale) {
        clientSelected.sumValue -= transaction.value;
      } else {
        clientSelected.sumValue += transaction.value;
      }
      clie[clie.indexOf(clientSelected)] = clientSelected;

      deleteTransactionList(temp, transaction, clie);

      let attList = [];
      for(let i in temp) {
        if(clientSelected.id == temp[i].client) {
          attList.push(temp[i]);
        }
      }
      setShowTransactionsClient(attList);
    }

    Alert.alert(
      "Deletar",
      "Tem certeza que deseja deletar esta transação?",
      [
        { text: "NÃO", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "SIM", onPress: () => del() },
      ]
    );
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader_primary}>
        <View style={styles.containerLineOne}>
          <View style={{width: '50%'}}>
            <TouchableOpacity style={{width: '100%', flexDirection: 'row'}} onPress={ () => setOpenSortModal(true)}>
              <View style={{width: '80%', justifyContent: 'center'}}>
                <Text numberOfLines={1} style={styles.orderType_primary}>{sortTxt}</Text>
              </View>
              <View style={{width: '20%', justifyContent: 'center', alignItems: 'center'}}>
                <Ionicons name="chevron-down" size={metrics.sizeIcon} color={colors.white_standard} style={styles.iconArrowDown_primary}/>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{width: '50%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => setOpenSearchModal(true)}>
              {searchTxt == ''
              ?
              <Entypo name="magnifying-glass" size={metrics.sizeIcon} color={colors.white_standard}/>
              :
              <Entypo name="magnifying-glass" size={metrics.sizeIcon} color={colors.red_standard}/>
              }
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => setOpenFilterModal(true)}>
              <AntDesign name="filter" size={metrics.sizeIcon} color={colors.white_standard}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerLineTwo}>
          <TouchableOpacity style={styles.btnAdd} onPress={ () => setOpenAddClientModal(true)}>
            <Text style={styles.iconButtonAdd}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerBody_primary}>
      <FlatList 
          showsVerticalScrollIndicator={false}
          data={showClient}
          keyExtractor={item => item}
          renderItem={( { item } ) => {
            return(
              <View style={{flex:1, marginLeft: 15, marginRight: 15, marginTop: 20}}>
                <TouchableOpacity style={styles.btnItemFlatList} onPress={ () => selectClient(item)}>
                  <View style={{width:'77%'}}>
                    <View style={{height: 30}}>
                      <Text numberOfLines={1} style={styles.txtNameItem}>{item.name}</Text>
                    </View>

                    <View style={{height: 24, flexDirection: 'row', alignItems: 'center'}}>
                      <AntDesign name="tago"size={20} color={colors.black_standard}/>
                      <Text style={styles.txtTagCategoryItem}>{item.tag != "" ? item.tag : "---"}</Text>
                    </View>
                  </View>

                  <View style={{width:'23%'}}>
                    <View style={{justifyContent: 'center', height: 30, alignItems: 'flex-end'}}>
                      <Text style={selectColor(item.sumValue, 0)}>R$ {item.sumValue.toFixed(2).replace(".", ",")}</Text>
                    </View>

                    <View style={styles.containerPin}>
                      <AntDesign name={selectColor(item.sumValue, 1)} size={15} style={selectColor(item.sumValue, 2)}/>
                    </View> 
                  </View>
                </TouchableOpacity>
              </View>
            )
          }}
        />
        <View style={{height:5}}/>
      </View>

      <Modal animationType="fade" transparent={true} visible={openSortModal}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: 15, height: 129}}>
            <TouchableOpacity style={{height:"100%"}} onPress={ () => setOpenSortModal(false)} />
          </View>

          <View style={styles.containerSort}>
            <TouchableOpacity onPress={()=>{sortClients(0)}} style={styles.btnSort}>
              <Text style={styles.txtSortButton}>Alfabetica Crescente</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{sortClients(1)}} style={styles.btnSort}>
              <Text style={styles.txtSortButton}>Alfabetica Decrescente</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{sortClients(2)}} style={styles.btnSort}>
              <Text style={styles.txtSortButton}>Maior Valor</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{sortClients(3)}} style={styles.btnSort}>
              <Text style={styles.txtSortButton}>Menor Valor</Text>
            </TouchableOpacity>
          </View>
        </View> 

        <View style={{flex: 1}}>
          <TouchableOpacity style={{height:"100%"}} onPress={ () => setOpenSortModal(false)} />
        </View>     
      </Modal>

      <Modal animationType="fade" transparent={true} visible={openSearchModal}>
        <View style={styles.containerSearch}>
          <View style={{marginTop: 10}}></View>
          <Text style={styles.txtBoldWhite}>Pesquisar</Text>

          <View style={{flexDirection: 'row'}}>
            <TextInput
              placeholder="Cliente"
              style={styleSearchInput()}
              value={searchTxt}
              onChangeText={ (texto) => searchClients(texto) }>
            </TextInput>
            {searchTxt == '' 
            ?
            <View></View>
            :
            <TouchableOpacity onPress={ () => (setSearchTxt(''), searchClients(''))} style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
              <Ionicons name="close-circle-outline" size={metrics.sizeIcon} color={colors.white_standard}  style={{marginBottom: 8}}/>
            </TouchableOpacity>
            }
          </View>
        </View>

        <View style={{flex: 6}}>
          <TouchableOpacity style={{height:"100%"}} onPress={ () => setOpenSearchModal(false)} />
        </View>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={openFilterModal}>
        <View style={styles.containerModalBlue}>
          <View style={styles.containerHeader_secondaryBlue}>
            <View style={styles.headerTitle_secondaryFull}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ () => closeFilterModal()}>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_standard} />
              </TouchableOpacity>
              <Text style={styles.txtHeader}>Filtrar</Text>
            </View>
          </View>

          <View style={styles.containerBodyModalFilter}>
            <View style={{height:10}}/>

            <View style={{marginLeft: metrics.margin, marginRight: metrics.margin}}>
              <Text style={styles.txtBoldBlack}>Situação</Text>
              <View style={{flexDirection: 'row', marginTop: 7}}>
                <TouchableOpacity style={styleBtnFilterSituation(0)} onPress={ () => setFilterSituation(0)}>
                  <Text style={styleTxtFilterSituation(0)}>Todos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleBtnFilterSituation(1)} onPress={ () => setFilterSituation(1)}>
                  <Text style={styleTxtFilterSituation(1)}>Efetuadas</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleBtnFilterSituation(2)} onPress={ () => setFilterSituation(2)}>
                  <Text style={styleTxtFilterSituation(2)}>Pendentes</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.txtBoldBlack}>Grupos</Text>
              <View style={{flexDirection: 'row', marginTop: 7}}>
                <TouchableOpacity style={styleBtnFilterTag(0)} onPress={ () => selectAllTags()}>
                  <Text style={styleTxtFilterTag(0)}>Todos</Text>
                </TouchableOpacity>

                <FlatList
                  horizontal
                  marginHorizontal={3}
                  showsVerticalScrollIndicator ={false}
                  showsHorizontalScrollIndicator={false}
                  data={tagList}
                  keyExtractor={item => item}
                  renderItem={( { item } ) => {
                    return(
                      <TouchableOpacity style={styleBtnFilterTag(1, item)} onPress={ () => selectTag(item)}>
                        <Text style={styleTxtFilterTag(1, item)}>{item}</Text>
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>
            </View>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.btnConfirmFilters} onPress={ () => filterClients()}>
              <Ionicons name="checkmark-sharp"size={25} color={colors.white_standard} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={false} visible={openAddClientModal}>
        <ScrollView style={styles.containerModal}>
          <View style={styles.containerHeader_secondary}>
            <View style={styles.headerTitle_secondaryFull}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ closeAddClientModal }>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_standard} />
              </TouchableOpacity>
              <Text style={styles.txtHeader}>Adicionar cliente</Text>
            </View>
          </View>

          <View style={styles.containerBodyAddModal}>
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <Ionicons name="md-person" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
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

            <View style={styles.containerTitleValue}>
              <Text style={styles.txtTitleValue}>Valor inicial</Text>
            </View>

            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome name="dollar" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
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

            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome name="phone" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
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

            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome name="home" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                multiline={true}
                placeholder='Endereço'
                style={styles.input}
                autoCorrect={false}
                value={inputAddress}
                onChangeText={ (texto) => setInputAddress(texto) }
                />
              </View>
            </View>

            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome5 name="calendar-alt" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
              </View>
              <View style={styles.containerInputBirthLeft}>
                <TextInput
                keyboardType='numeric'
                placeholder='Nascimento'
                maxLength={10}
                style={styles.input}
                autoCorrect={false}
                value={inputBirth}
                onChangeText={ (texto) => setInputBirth(maskDate(texto, isSwitchEnabled))}
                />
              </View>
              <View style={styles.containerInputBirthRight}>
                <Text>Ano</Text>
                <Switch
                  value={isSwitchEnabled}
                  onValueChange={(value) => (setSwitch(value), setInputBirth(maskDate(inputBirth, value)))}
                  trackColor={{ true: colors.green_standard, false: colors.grey_standard }}
                />
              </View>
            </View>

            <View style={styles.containerFieldFlat}>
              <View style={styles.containerSelectFlat}>
                <View style={styles.containerIcon}>
                  <AntDesign name="tago" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
                </View>
                
                <View style={styles.containerInput}>
                  <Text style={styles.inputSelect}>Grupo</Text>
                </View>
              </View>

              <View style={styles.containerSelectedFlat}>
                <Text>Selecione: </Text>
              </View>

              <View style={styles.containerFlatList}>
                <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={tagList}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                  return(
                    <TouchableOpacity style={ styleBtnAddTag(item) } onPress={ () => selectAddTag(item)}>
                      <Text style={styleTxtAddTag(item)}>{item}</Text>
                    </TouchableOpacity>
                  )
                }}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.btnConfirm} onPress={()=>{addClient()}}>
              <AntDesign name="check" size={metrics.sizeIcon} color={colors.white_standard}/>
            </TouchableOpacity> 
            
            <View style={{height:350}}/>
          </View>
        </ScrollView>
      </Modal>

      <Modal animationType="slide" transparent={false} visible={openClientModal}>
        <View style={styles.containerHeader_secondaryRounded}>
          <View style={styles.headerTitle_secondaryFull}>
            <View style={styles.headerTitle_withButton}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ () => closeClientModal() }>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_standard} />
              </TouchableOpacity>
              
              <Text style={styles.txtHeader}>{clientSelected.name}</Text>
            </View>

            <View style={styles.headerTitle_buttons}>
              {btnVisible
              ?
              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => changeVisibility() }>
                <Feather name="eye" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity> 
              :
              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => changeVisibility() }>
                <Feather name="eye-off" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity>
              }

              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => deleteClient() }>
                <FontAwesome name="trash-o" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity>         
              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => modifyClient() }>
                <Feather name="edit" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{marginBottom: 10}} onPress={ () => setOpenClientHeaderModal(true)}>
              <Ionicons name="chevron-down" size={metrics.sizeIcon+5} color={colors.white_standard}/>
            </TouchableOpacity>
          </View>
        </View>
        
        <ScrollView style={styles.containerModalWhite}>
          <View style={styles.containerBodyModal}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: metrics.font_x_small}}>~~ PAGAMENTOS E VENDAS ~~</Text>
            </View>
            
            <View>
              <View style={styles.lineHorizontal}/>
              
              <View style={styles.containerInitialValue}>
                <View style={{ height: 35, borderRightWidth: 1, borderRightColor: '#d89ca1',
                    width: btnVisible ? '72%' : '77%',
                    justifyContent: 'center', alignItems: 'flex-end',
                }}>
                  <Text>Valor inicial </Text>
                </View>
                <View style={styles.initialValue}>
                  <Text> R$ {clientSelected != 0 ? clientSelected.value.toFixed(2).replace(".", ",") : ""}</Text>
                </View>
              </View>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={showTransactionsClient}
              keyExtractor={item => item}
              renderItem={( { item } ) => {
                return(
                  <View>
                    <View style={styles.lineHorizontal}/>

                    <View style={selectStyle(1, item)}>
                      <View style={{width: "13%", alignItems: 'flex-start', justifyContent: 'center'}}>
                        <Text style={{fontSize:11}}>{formatDate(item)}</Text>
                      </View>

                      {renderProducts(item)}

                      <View style={selectStyle(4, item)}>
                        <Text style={styleTxtAreaView(item.isSale)}> R$ {item.value.toFixed(2).replace(".", ",")}</Text>
                      </View>

                      {btnVisible
                      ?
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={ () => deleteTransaction(item) }>
                          <FontAwesome name="trash-o" size={15} color={colors.black_standard} style={styles.iconTrash}/>
                        </TouchableOpacity>
                      </View>
                      :
                      <View></View>
                      }
                    </View>
                  </View>
                )
              }}
            />
            <View style={styles.lineHorizontal}/>
            <View style={{height: 35}}/>

            <View style={{flexDirection: 'row',  marginLeft: metrics.margin, marginRight: metrics.margin }}>
              <View style={{width: "13%"}}></View>
              
              <View style={selectStyle(2, null)}>
                <Text style={{fontWeight: 'bold', fontSize: metrics.font_x_small}}>TOTAL DEVEDOR: </Text>
              </View>
              <View style={selectStyle(4, null)}>
                <Text> R$ {clientSelected != 0 ? clientSelected.sumValue.toFixed(2).replace(".", ",") : "0,00"}</Text>
              </View>
            </View>

            <View style={{height:10}}/>
          </View>
        </ScrollView>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={openClientHeaderModal}>
        <View style={{height: 210, backgroundColor: colors.green_standard, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', height: 50}}>
            <View style={styles.headerTitle_withButton}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ () => closeClientModal() }>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_standard} />
              </TouchableOpacity>

              <Text style={styles.txtHeader}>Dados do cliente</Text>
            </View>

            <View style={styles.headerTitle_buttons}>
              {btnVisible
              ?
              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => changeVisibility() }>
                <Feather name="eye" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity> 
              :
              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => changeVisibility() }>
                <Feather name="eye-off" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity>
              }

              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => deleteClient() }>
                <FontAwesome name="trash-o" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity>         
              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => modifyClient() }>
                <Feather name="edit" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.clientHeaderModalOne}>
            <Text style={styles.titleTxtModal}>Nome: </Text>
            <Text numberOfLines={1} style={{color: colors.white_standard}}>{clientSelected.name}</Text>
          </View>

          <View style={styles.clientHeaderModalOne}>
            <Text style={styles.titleTxtModal}>Grupo: </Text>
            <View style={styles.containerTag}>
              <Text numberOfLines={1} style={{color: colors.white_standard}}>{clientSelected.tag}</Text>
            </View>
          </View>

          <View style={styles.clientHeaderModalOne}>
            <View style={{width: '50%', flexDirection: 'row'}}>
              <Text style={styles.titleTxtModal}>Telefone: </Text>
              <Text numberOfLines={1} style={{color: colors.white_standard}}>{clientSelected.phone}</Text>
            </View>
            <View style={{width: '50%', flexDirection: 'row'}}>
              <Text style={styles.titleTxtModal}>Aniversário: </Text>
              <Text numberOfLines={1} style={{color: colors.white_standard}}>{clientSelected != 0 ? clientSelected.birth.replace("-", "/").replace("-", "/") : ""}</Text>
            </View>
          </View>

          <View style={styles.clientHeaderModalTwo}>
            <Text style={styles.titleTxtModal}>Endereço: </Text>
            <Text style={{color: colors.white_standard, marginRight: 30}}>{clientSelected.address}</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity style={{height:"100%"}} onPress={ () => setOpenClientHeaderModal(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
