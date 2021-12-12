import React, { useState, useContext }  from 'react';
import { View, ScrollView, Text, TextInput, TouchableOpacity, Modal, Switch, FlatList, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import DatePicker from 'react-native-datepicker';

import { Ionicons, AntDesign, FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';

import AuthContext from '../../contexts/auth';
import styles from './styles';
import { colors, metrics } from '../../styles';
import { searchItens, maskCurrency, maskDate, maskQuantity, validateDate } from '../../utils';

export default function NewSalePage({ navigation, route }) {
  const { nextTransactionId, transactionList, clientList, productList, changeTransactionList } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [showCLients, setShowCLients] = useState([]);
  const [showProducts, setShowProducts] = useState([]);
  const [clientSelected, setClientSelected] = useState([]);
  const [productSelected, setProductSelected] = useState([["null"]]);
  const [quantitySelected, setQuantitySelected] = useState([["null"]]);
  const [valueSuggested, setValueSuggested] = useState(0);
  const [mensageValue, setMensageValue] = useState("0,00");
  const [isSale, setIsSale] = useState(true);
  
  const [inputClient, setInputClient] = useState("");
  const [inputProduct, setInputProduct] = useState("");
  const [inputQuantity, setInputQuantity] = useState("0");
  const [inputSaleValue, setInputSaleValue] = useState(0);
  const [isSwitchEnabled, setSwitch] = useState(false);
  const [inputPayValue, setInputPayValue] = useState(0);
  const [inputDate, setInputDate] = useState("");
  const [inputTypeDate, setInputTypeDate] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setOpen(true);
      setTitle("Nova venda");
      setInputQuantity("1");
    }, [])
  );

  function changeMensageValue(value) {
    if(value != 0) {
      setMensageValue(value.toString().toString().replace(".", ","));
    } else if(value == 0) {
      setMensageValue("0,00");
    }
  }

  function filterClient(texto) {
    if(texto.length >= 3) {
      let lista = searchItens(clientList, texto)
      setShowCLients(lista);
    } else {
      setShowCLients([]);
    }
  }

  function filterProduct(texto) {
    if(texto.length >= 3) {
      let lista = searchItens(productList, texto);
      lista = lista.filter( item => !productSelected.includes(item) );
      setShowProducts(lista);
    } else {
      setShowProducts([]);
    }
  }

  function selectClient(client) {
    setClientSelected(client);
    setInputClient("");
    setShowCLients([]);
  }

  function selectProduct(product) {
    let tempProd = productSelected.slice();
    let tempQuant = quantitySelected.slice();
    let quantAtt = inputQuantity;
    let suggested = valueSuggested;

    if(tempProd[productSelected.length-1][0] == "null"){
      tempProd.pop();
      tempQuant.pop();
    }
    
    tempProd.push(product);
    tempProd.push(["null"]);
    tempQuant.push(quantAtt);
    tempQuant.push("null");
    
    suggested = parseFloat(suggested);
    suggested += parseFloat(product.value)*parseInt(quantAtt);
    suggested = suggested.toFixed(2);

    setValueSuggested(suggested);
    changeMensageValue(suggested);

    setProductSelected(tempProd);
    setQuantitySelected(tempQuant);

    setInputProduct("");
    setInputQuantity("1")
    setShowProducts([]);
  }

  function removeProduct(index) {
    let tempProd = productSelected.slice();
    let tempQuant = quantitySelected.slice();
    let suggested = valueSuggested;

    suggested = parseFloat(suggested);
    suggested -= parseFloat(tempProd[index].value)*parseInt(quantitySelected[index]);
    suggested = suggested.toFixed(2);

    setValueSuggested(suggested);
    changeMensageValue(suggested);

    tempProd.splice(index, 1);
    setProductSelected(tempProd);
    tempQuant.splice(index, 1);
    setQuantitySelected(tempQuant);
  }

  function styleBtnSale(key) {
    if(key == 0 && isSale == true) {
      return styles.btnSaleSelectedLeft;
    } else if(key == 1 && isSale == false) {
      return styles.btnSaleSelectedRight;
    } else {
      return styles.btnSaleUnselected
    }
  }

  function selectStyleSwitch() {
    if(!isSwitchEnabled) {
      return styles.containerField;
    } else {
      return styles.containerFieldSwitch;
    }
  }

  function selectStyleButton(key) {
    if(inputTypeDate == key) {
      return styles.btnDateSelected;
    } else {
      return styles.btnDate
    }
  }

  function selectStyleTxt(key) {
    if(inputTypeDate == key) {
      return styles.txtDateSelected
    } else {
      return styles.txtDate
    }
  }

  function calcQuantity(key) {
    let quantity = parseInt(inputQuantity);
    if(inputQuantity.length === undefined || inputQuantity.length == 0) {
      quantity = 1;
    }
    if(key == 0) {
      if(quantity-1 > 0) {
        quantity -= 1;
      }  
    } else {
      if(quantity+1 < 10000){
        quantity += 1;
      }
    }
    setInputQuantity(quantity.toString())
  }

  function selectProductInput(index) {
    if(index == 0) {
      return styles.containerFieldProduct;
    } else {
      return styles.containerFieldProduct2;
    }
  }

  function renderProducts(index) {
     return (
      <View style={selectProductInput(index)}>
        <View style={styles.containerIcon}>
          <AntDesign name="inbox" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
        </View>

        {productSelected[index][0] == "null"
        ?
        <View style={styles.containerInputFlatAndRow}>
          <TextInput
            placeholder="Produto"
            style={styles.inputProduct}
            autoCorrect={false}
            value={inputProduct}
            onChangeText={ (texto) => (setInputProduct(texto), filterProduct(texto)) }>
          </TextInput>

          <TouchableOpacity onPress={ () => calcQuantity(0) } style={{width: '11%', justifyContent: 'center', alignItems: 'center' }}>
            <Feather name="minus-circle" size={30} color={colors.grey_standard} />
          </TouchableOpacity>
          <TextInput
            keyboardType='numeric'
            placeholder="1"
            style={styles.inputQuantity}
            autoCorrect={false}
            textAlign={'center'}
            value={inputQuantity}
            onChangeText={ (texto) => setInputQuantity(maskQuantity(texto)) }>
          </TextInput>
          <TouchableOpacity onPress={ () => calcQuantity(1) } style={{width: '11%', justifyContent: 'center', alignItems: 'center' }}>
            <Feather name="plus-circle" size={30} color={colors.grey_standard} />
          </TouchableOpacity>

          <View style={{width: '2%'}}/>
        </View>
        :
        <View style={styles.containerInputFlatAndRow}>
          <View style={styles.txtFlatSelected}>
            <Text>{quantitySelected[index]}x {productSelected[index].name}</Text>
          </View>
          <TouchableOpacity onPress={ () => removeProduct(index) } style={{width: '10%', justifyContent: 'center', alignItems: 'center' }}>
            <Ionicons name="close-circle-outline" size={metrics.sizeIcon} color={colors.grey_standard} />
          </TouchableOpacity>
        </View>
        }
      </View>
    );
  }

  function addSaleOrPay() {
    function constructDate() {
      let dateFormated = "";
      let now = new Date();

      if(inputTypeDate == 1) {
        now.setDate(now.getDate() - 1);
      }

      if(inputTypeDate != 2){
        dateFormated += now.getDate() + "-" + (now.getMonth()+1) + "-" + now.getFullYear() + " ";
      } else {
        dateFormated = inputDate.replace("/", "-").replace("/", "-");
      }
      if(inputTypeDate == 0) {
        dateFormated += now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
      } else {
        dateFormated += "23:59:59";
      }

      return dateFormated;
    }

    function constructValue(value) {
      let valueCurrency = value;
      if(value.length === undefined || value.length == 0) {
        valueCurrency = valueSuggested;
        if(!isSale){
          valueCurrency = 0;
        }
        return parseFloat(valueCurrency);
      }

      return parseFloat(valueCurrency.replace(",", "."));
    }

    function constructProduct() {
      let product = [];
      if(productSelected[0][0] != "null"){
        for(let i=0; i<productSelected.length-1; i++) {
          product.push(parseInt(productSelected[i].id));
          product.push(productSelected[i].name);
          product.push(parseInt(quantitySelected[i]));
        }
      } else {
        product.push(0);
        product.push("Produto não informado");
        product.push(1);
      }

      return product;
    }

    function constructTransaction(key) {
      let value;
      let products;
      if(key == 0) {
        value = constructValue(inputPayValue);
        products = [];
        sale = 0;
      } 
      else { 
        value = constructValue(inputSaleValue);
        products = constructProduct();
        sale = 1;
      }

      let transaction = {
        id: nextTransactionId,
        client: parseInt(clientSelected.id),
        products: products,
        isSale: sale,
        value: value,
        date: constructDate(),
      }

      return transaction;
    }

    let mensagem = "";
    
    if(clientSelected.name === undefined){
      mensagem = "Nome do cliente em branco";
    }

    if(isSale) {
      if(inputSaleValue == 0 && valueSuggested == 0 && productSelected[0][0] == "null"){
        mensagem = "Valor da venda não pode ser zero";
      }
    } else {
      if(inputPayValue == 0) {
        mensagem = "Valor do pagamento não pode ser zero";
      }
    }
    
    if(inputTypeDate == 2){
      mensagem = validateDate(inputDate, true);
    }

    if(mensagem != "") {
      Alert.alert(
        'Alerta', mensagem,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      );
      return;
    }

    let transactions = transactionList.slice();
    if(isSale) {
      let transaction = constructTransaction(1);
      transactions.push(transaction);
      changeTransactionList(transactions, transaction, 0);
      if(isSwitchEnabled) {
        transaction = constructTransaction(0);
        if(transaction.value != 0) {
          transactions.push(transaction);
          changeTransactionList(transactions, transaction, 1);
        }
      }
    } else {
      let transaction = constructTransaction(0);
      transactions.push(transaction);
      changeTransactionList(transactions, transaction, 0);
    }

    closeModal();
  }

  function closeModal() {
    setOpen(false);
    setTitle("");
    setShowCLients([]);
    setShowProducts([]);
    setClientSelected([]);
    setProductSelected([["null"]]);
    setQuantitySelected([["null"]]);
    setValueSuggested(0);
    setMensageValue("0,00");
    setIsSale(true);

    setInputClient("");
    setInputProduct("");
    setInputQuantity("0");
    setInputSaleValue(0);
    setSwitch(false);
    setInputPayValue(0);
    setInputDate("");
    setInputTypeDate(0);

    navigation.navigate("ClientsPage");
  }

  return(
    <View style={styles.container}>
      <Modal animationType="slide" transparent={false} visible={open}>
        <ScrollView style={styles.containerModal}>
          <View style={styles.containerHeader_secondary}>
            <View style={styles.headerTitle_secondaryFull}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ () => closeModal() }>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_standard} />
              </TouchableOpacity>
              <Text style={styles.txtHeader}>{title}</Text>
            </View>
          </View>

          <View style={styles.containerBodyAddModal}>
            <View style={{flexDirection: 'row', width: '90%', marginTop: 10, marginBottom: 5}}>
              <TouchableOpacity style={ styleBtnSale(0) } onPress={ () => (setIsSale(true), setTitle("Nova venda"))}>
                <Text style={ styles.txtBoldWhite }>Venda</Text>
              </TouchableOpacity>

              <View style={{width: '4%'}}></View>

              <TouchableOpacity style={ styleBtnSale(1) } onPress={ () => (setIsSale(false), setTitle("Novo pagamento"))}>
                <Text style={ styles.txtBoldWhite }>Pagamento</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.containerFieldFlat}>
              <View style={styles.containerSelectFlat}>
                <View style={styles.containerIcon}>
                  <Ionicons name="md-person" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
                </View>
                {clientSelected == 0
                ?
                <View style={styles.containerInput}>
                  <TextInput
                    placeholder="Cliente"
                    style={styles.input}
                    autoCorrect={false}
                    value={inputClient}
                    onChangeText={ (texto) => (setInputClient(texto), filterClient(texto)) }>
                  </TextInput>
                </View>
                :
                <View style={styles.containerInputFlatAndRow}>
                  <View style={styles.txtFlatSelected}>
                    <Text>{clientSelected.name}</Text>
                  </View>
                  <TouchableOpacity onPress={ () => setClientSelected([]) } style={{width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                    <Ionicons name="close-circle-outline" size={metrics.sizeIcon} color={colors.grey_standard} />
                  </TouchableOpacity>
                </View>
                }
              </View>

              {showCLients != 0
              ?
              <View>
                <View style={styles.containerSelectedFlat}>
                  <Text>Selecione: </Text>
                </View>

                <View style={styles.containerFlatList}>
                  <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={showCLients}
                  keyExtractor={item => item}
                  renderItem={( { item } ) => {
                    return(
                      <TouchableOpacity style={styles.btnItem} onPress={ () => selectClient(item) }>
                        <Text numberOfLines={1} style={styles.txtFilterBlack}>{item.name}</Text>
                      </TouchableOpacity>
                    )
                  }}
                  />
                </View>
              </View>
              :
              <View></View>
              }
            </View>

            {isSale == true
            ?
            <View>
              <View style={styles.containerProducts}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  data={productSelected}
                  keyExtractor={item => item}
                  renderItem={( { item } ) => {
                    return(
                      <View>
                        {renderProducts(productSelected.indexOf(item))}
                      </View>
                    )
                  }}
                />
                
                {showProducts != 0
                ?
                <View style={{height: 20 + (showProducts.length*55)}}>
                  <View style={styles.containerSelectedFlat}>
                    <Text>Selecione: </Text>
                  </View>

                  <View style={styles.containerFlatList}>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    data={showProducts}
                    keyExtractor={item => item}
                    renderItem={( { item } ) => {
                      return(
                        <TouchableOpacity style={ styles.btnItem } onPress={ () => selectProduct(item) }>
                          <Text numberOfLines={1} style={styles.txtFilterBlack}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                    />
                  </View>
                </View>
                :
                <View></View>
                }
              </View>

              <View style={styles.containerTitleValue}>
                <Text style={styles.txtTitleValue}>Valor da venda</Text>
              </View>

              <View style={styles.containerField}>
                <View style={styles.containerIcon}>
                  <FontAwesome name="dollar" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
                </View>
                <View style={styles.containerInput}>
                  <TextInput
                    keyboardType='numeric'
                    placeholder={mensageValue}
                    style={styles.input}
                    autoCorrect={false}
                    value={inputSaleValue}
                    onChangeText={ (texto) => setInputSaleValue(maskCurrency(texto)) }
                  />
                </View>
              </View>

              <View style={selectStyleSwitch()}>
                <View style={styles.containerIcon}>
                  <Feather name="check-circle" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
                </View>
                <View style={styles.containerReceived}>
                  <View style={styles.received}>
                    <Text style={styles.input}>Recebido</Text>
                  </View>
                  <View style={styles.switch}>
                    <Switch
                      value={isSwitchEnabled}
                      onValueChange={(value) => setSwitch(value)}
                      trackColor={{ true: colors.green_standard, false: colors.grey_standard }}
                    />
                  </View>
                </View>
              </View>

              {isSwitchEnabled == true
              ?
              <View style={styles.containerFieldPay}>
                <View style={styles.containerIcon}>
                  <FontAwesome name="dollar" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
                </View>
                <View style={styles.containerInput}>
                  <TextInput
                    keyboardType='numeric'
                    placeholder={mensageValue}
                    style={styles.input}
                    autoCorrect={false}
                    value={inputPayValue}
                    onChangeText={ (texto) => setInputPayValue(maskCurrency(texto)) }
                  />
                </View>
              </View>
              :
              <View></View>
              }
            </View>
            :
            <View></View>
            }

            {isSale != true
            ?
            <View>
              <View style={styles.containerTitleValue}>
                <Text style={styles.txtTitleValue}>Valor do pagamento</Text>
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
                    value={inputPayValue}
                    onChangeText={ (texto) => setInputPayValue(maskCurrency(texto)) }
                  />
                </View>
              </View>
            </View>
            :
            <View></View>
            }

            {inputTypeDate != 2
            ?
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome5 name="calendar-alt" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
              </View>
              <View style={styles.containerButtons}>
                <TouchableOpacity style={selectStyleButton(0)} onPress={ () => setInputTypeDate(0)}>
                  <Text style={selectStyleTxt(0)}>Hoje</Text>
                </TouchableOpacity>
                <TouchableOpacity style={selectStyleButton(1)} onPress={ () => setInputTypeDate(1)}>
                  <Text style={selectStyleTxt(1)}>Ontem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={selectStyleButton(2)} onPress={ () => setInputTypeDate(2)}>
                  <Text style={selectStyleTxt(2)}>Outros...</Text>
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={styles.datePicker}
                    date={inputDate}
                    hideText={true}
                    showIcon={false}
                    onDateChange={(texto) => (setInputDate(texto), setInputTypeDate(2))}
                    customStyles={{
                      dateIcon: {
                        position: 'absolute',
                      },
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            :
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome5 name="calendar-alt" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
              </View>
              <View style={styles.containerInputBirthLeft}>
                <TextInput
                keyboardType='numeric'
                placeholder='Data'
                maxLength={10}
                style={styles.input}
                autoCorrect={false}
                value={inputDate}
                onChangeText={ (texto) => setInputDate(maskDate(texto, true))}
                />
              </View>
              <View style={styles.containerInputBirthRight}>
                <DatePicker
                format="DD/MM/YYYY"
                style={styles.datePicker2}
                date={inputDate}
                onDateChange={ (texto) => setInputDate(texto) }
                />
              </View>
            </View>
            }

            <TouchableOpacity style={styles.btnConfirm} onPress={ () => addSaleOrPay() }>
              <AntDesign name="check" size={metrics.sizeIcon} color={colors.white_standard}/>
            </TouchableOpacity> 

            <View style={{height:370}}/>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}
