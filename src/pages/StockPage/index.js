import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, FlatList, Image, Modal, Alert } from 'react-native';

import { Ionicons, Entypo, AntDesign, FontAwesome, FontAwesome5, Feather } from '@expo/vector-icons';

import AuthContext from '../../contexts/auth';
import styles from './styles';
import { colors, metrics } from '../../styles';
import { sortItens, searchItens, filterItensByProducts, maskCurrency } from '../../utils';

export default function StockPage({ navigation, route }) {
  const { productList, nextProductId, categoryList, changeProductList, deleteProductList, transactionList } = useContext(AuthContext);

  const [showProduct, setShowProduct] = useState([]);
  const [showSearchProducts, setShowSearchProducts] = useState([]);
  const [showFilterProducts, setShowFilterProducts] = useState([]);

  const [typeSort, setTypeSort] = useState(0);
  const [openSortModal, setOpenSortModal] = useState(false);
  const [sortTxt, setSortTxt] = useState("");

  const [openSearchModal, setOpenSearchModal] = useState(false);
  const [searchTxt, setSearchTxt] = useState("");

  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [filterSituation, setFilterSituation] = useState(0);
  const [filterCategorys, setFilterCategorys] = useState([]);
  const [randomColors, setRandomColors] = useState([]);

  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [inputName, setInputName] = React.useState('');
  const [inputValue, setInputValue] = React.useState(0);
  const [inputQuantity, setInputQuantity] = React.useState(0);
  const [inputCategory, setInputCategory] = React.useState('');

  const [openProductModal, setOpenProductModal] = useState(false);
  const [showMovementsProduct, setShowMovementsProduct] = useState([]);
  const [productSelected, setProductSelected] = useState([]);

  const [openProductHeaderModal, setOpenProductHeaderModal] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  useEffect(()=> {
    sortProducts(typeSort);
  }, [productList, showSearchProducts, showFilterProducts]);
  
  function sortProducts(ts) {
    setTypeSort(ts);
    setOpenSortModal(false);
    
    if(searchTxt == '' && filterSituation == 0 && filterCategorys == 0) {
      setShowProduct(sortItens(productList, ts));
    } else if (searchTxt != '' && filterSituation == 0 && filterCategorys == 0) {
      setShowProduct(sortItens(showSearchProducts, ts));
    } else if (searchTxt == '' && (filterSituation != 0 || filterCategorys != 0)) {
      setShowProduct(sortItens(showFilterProducts, ts));
    } else {
      let showFilters = showSearchProducts.filter( item => showFilterProducts.includes(item) );
      setShowProduct(sortItens(showFilters, ts));
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

  function searchProducts(text) {
    setShowSearchProducts(searchItens(productList, text));
    setSearchTxt(text);
  }

  function filterProducts() {
    setShowFilterProducts(filterItensByProducts(productList, filterSituation, filterCategorys));
    setOpenFilterModal(false);
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
    if(showFilterProducts != 0) {
      setFilterSituation(0);
      setFilterCategorys([]);
    }
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

  function styleBtnFilterCategory(origin, item) {
    if(origin == 0) {
      if(filterCategorys == 0) {return styles.btnCategorySelected;}
      else {return styles.btnCategory;}
    } else {
      if(filterCategorys.indexOf(item) == -1) {
        return styles.btnCategory;
      } else {
        if(filterCategorys != 0) {
          let colorIndex = (categoryList.indexOf(item) + 1) / (categoryList.length + 1);
          if(randomColors.length != categoryList.length) {
            let temp = randomColors.slice()
            temp.push(Math.random());
            setRandomColors(temp);
          }
          let colorRandom = (randomColors[categoryList.indexOf(item)] + colorIndex) / 2;
          if(colorRandom == 1) {
            colorRandom -= 0.1;
          }
    
          let btnCategory = {
            marginLeft: 3,
            marginRight: 3,
            backgroundColor: "#" + Math.floor(colorRandom * 16777215).toString(16),
            marginBottom: 10,
            color: colors.grey_standard,
            fontSize: metrics.font_medium,
            borderRadius: 30,
            padding: 10
          }
          return btnCategory;
        } else {
          return styles.btnCategory;
        }
      }
    }
  }

  function styleTxtFilterCategory(origin, item) {
    if(origin == filterCategorys) {
      return styles.txtFilterSelected;
    } else {
      if(filterCategorys.indexOf(item) == -1){
        return styles.txtFilterBlack;
      } else {
        return styles.txtFilterSelected;
      }
    }
  }

  function styleBtnAddCategory(item) {
    if(inputCategory == item) {
      return styles.btnCategorySelectedGreen;
    }
    return styles.btnCategory;
  }

  function styleTxtAddCategory(item) {
    if(inputCategory == item) {
      return styles.txtFilterSelected;
    }
    return styles.txtFilterBlack;
  }

  function selectAllCategorys() {
    if(filterCategorys != 0){
      setFilterCategorys([]);
    }
  }

  function selectCategory(item) {
    let temp = filterCategorys.slice();
    if(filterCategorys.indexOf(item) == -1) {
      temp.push(item);
    } else {
      temp.splice(temp.indexOf(item), 1);
    }
    setFilterCategorys(temp);
  }

  function selectAddCategory(item) {
    if(inputCategory != item) {
      setInputCategory(item);
    } else {
      setInputCategory("");
    }
  }

  function closeAddProductModal() {
    setOpenAddProductModal(false);
    setInputName('');
    setInputValue(0);
    setInputQuantity(0);
    setInputCategory('');
  }

  function addProduct() {
    let mensagem = "";
    
    if(inputName === ''){
      mensagem = "Nome do produto em branco";
    } else if(inputName.length < 3) {
      mensagem = "Nome do produto deve ter ao menos 3 caracteres";
    }

    if(mensagem != "") {
      Alert.alert(
        'Alerta', mensagem,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      );
      return;
    }

    let valueCurrency = inputValue;
    if(inputValue.length === undefined) {
      valueCurrency = "0";
    }
    let initialQuantity = parseInt(inputQuantity);
    let sumQuantity = initialQuantity;
    if(productSelected != 0) {
      sumQuantity = productSelected.sumQuantity - productSelected.quantity + initialQuantity;
    }

    let product = {
      id: productSelected == 0 ? nextProductId : productSelected.id,
      name: inputName,
      value: parseFloat(valueCurrency.replace(",", ".")),
      quantity: sumQuantity,
      sumQuantity: parseInt(inputQuantity),
      category: inputCategory,
      readjustment: 0,
    }

    let products = productList.slice();
    let add;
    if(productSelected == 0) {
      products.push(product);
      add = true;
    } else {
      products[products.indexOf(productSelected)] = product;
      setProductSelected(product);
      add = false;
    }
    changeProductList(products, add);
    closeAddProductModal();
  }

  function selectProduct(product) {
    setOpenProductModal(true);
    setProductSelected(product);
    
    let temp = [];
    for(let transaction in transactionList) {
      for(let i = 0; i < transactionList[transaction].products.length; i += 3) {
        if(product.id == transactionList[transaction].products[i]) {
          let movement = {
            date: transactionList[transaction].date,
            quantity: transactionList[transaction].products[i+2],
            tipoMovement: "sale"
          }
          temp.push(movement)
        }
      }
    }

    if(product.readjustment != undefined && product.readjustment != 0) {
      let movement = {
        quantity: product.readjustment,
        tipoMovement: "readjustment"
      }
      temp.push(movement)
    }

    console.log(temp)
    setShowMovementsProduct(temp);
  }

  function closeProductModal() {
    setOpenProductHeaderModal(false);
    setOpenProductModal(false);
    setBtnVisible(false);
    setProductSelected([]);
  }

  function deleteProduct() {
    function del() {
      let temp = productList.slice();
      temp.splice(temp.indexOf(productSelected), 1);
      deleteProductList(temp, productSelected);
      closeProductModal();
    }

    Alert.alert(
      "Deletar",
      "Tem certeza que deseja deletar este produto? ¨" + productSelected.name + "¨",
      [
        { text: "NÃO", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "SIM", onPress: () => del() },
      ]
    );
  }

  function modifyProduct() {
    let valueTreated = productSelected.value.toString().replace(".", ",");
    let valueParts = valueTreated.split(",");
    if(valueParts.length == 1) {
      valueTreated += ",00";
    } else if(valueParts[1].length == 1) {
      valueTreated += "0";
    }

    setOpenAddProductModal(true);
    setInputName(productSelected.name);
    setInputValue(valueTreated)
    setInputQuantity(productSelected.quantity.toString())
    setInputCategory(productSelected.category)
  }

  function selectStyle(key) {
    let retorno = {};
    let heightCalc = 35;

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
          <TouchableOpacity style={styles.btnAdd} onPress={ () => setOpenAddProductModal(true)}>
            <Text style={styles.iconButtonAdd}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.containerBody_primary}>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={showProduct}
          keyExtractor={item => item}
          renderItem={( { item } ) => {
            return(
              <View style={{flex:1, marginLeft: 15, marginRight: 15, marginTop: 20}}>
                <TouchableOpacity style={styles.btnItemFlatList} onPress={ () => selectProduct(item)}>
                  <View style={styles.containerImage}>
                    <Image style={styles.imageProduct} source={require('../../../assets/images/product.png')} />
                  </View>
                  
                  <View style={{width:'60%'}}>
                    <View style={{height: 30}}>
                      <Text numberOfLines={1} style={styles.txtNameItem}>{item.name}</Text>
                    </View>

                    <View style={{height: 24, flexDirection: 'row', alignItems: 'center'}}>
                      <FontAwesome name="bookmark-o"  size={20} color={colors.black_standard}/>
                      <Text style={styles.txtTagCategoryItem}>{item.category != "" ? item.category : "---"}</Text>
                    </View>
                  </View>

                  <View style={{width:'23%'}}>
                    <View style={{justifyContent: 'center', height: 30, alignItems: 'flex-end'}}>
                      <Text>R$ {item.value.toFixed(2).replace(".", ",")}</Text>
                    </View>

                    <View style={{height: 24, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                      <Image style={styles.imageQuantity} source={require('../../../assets/images/quantity.png')} />
                      <Text>{item.sumQuantity}</Text>
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
            <TouchableOpacity onPress={()=>{sortProducts(0)}} style={styles.btnSort}>
              <Text style={styles.txtSortButton}>Alfabetica Crescente</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{sortProducts(1)}} style={styles.btnSort}>
              <Text style={styles.txtSortButton}>Alfabetica Decrescente</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{sortProducts(2)}} style={styles.btnSort}>
              <Text style={styles.txtSortButton}>Maior Valor</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>{sortProducts(3)}} style={styles.btnSort}>
              <Text style={styles.txtSortButton}>Menor Valor</Text>
            </TouchableOpacity>
          </View>

          <View style={{width: '100%', height: 129}}>
            <TouchableOpacity style={{height:"100%"}} onPress={ () => setOpenSortModal(false)} />
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
              placeholder="Produto"
              style={styleSearchInput()}
              value={searchTxt}
              onChangeText={ (texto) => searchProducts(texto) }>
            </TextInput>
            {searchTxt == '' 
            ?
            <View></View>
            :
            <TouchableOpacity onPress={ () => (setSearchTxt(''), searchProducts(''))} style={{width: '10%', justifyContent: 'center', alignItems: 'center'}}>
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
                  <Text style={styleTxtFilterSituation(1)}>Em estoque</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styleBtnFilterSituation(2)} onPress={ () => setFilterSituation(2)}>
                  <Text style={styleTxtFilterSituation(2)}>Em falta</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.txtBoldBlack}>Marcas</Text>
              <View style={{flexDirection: 'row', marginTop: 7}}>
                <TouchableOpacity style={styleBtnFilterCategory(0)} onPress={ () => selectAllCategorys()}>
                  <Text style={styleTxtFilterCategory(0)}>Todos</Text>
                </TouchableOpacity>

                <FlatList
                  horizontal
                  marginHorizontal={3}
                  showsVerticalScrollIndicator ={false}
                  showsHorizontalScrollIndicator={false}
                  data={categoryList}
                  keyExtractor={item => item}
                  renderItem={( { item } ) => {
                    return(
                      <TouchableOpacity style={styleBtnFilterCategory(1, item)} onPress={ () => selectCategory(item)}>
                        <Text style={styleTxtFilterCategory(1, item)}>{item}</Text>
                      </TouchableOpacity>
                    )
                  }}
                />
              </View>
            </View>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.btnConfirmFilters} onPress={ () => filterProducts()}>
              <Ionicons name="checkmark-sharp"size={25} color={colors.white_standard} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={false} visible={openAddProductModal}>
        <ScrollView style={styles.containerModal}>
          <View style={styles.containerHeader_secondary}>
            <View style={styles.headerTitle_secondaryFull}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ closeAddProductModal }>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_standard} />
              </TouchableOpacity>
              <Text style={styles.txtHeader}>Adicionar produto</Text>
            </View>
          </View>

          <View style={styles.containerBodyAddModal}>
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
              <FontAwesome name="gift" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                  placeholder="Nome do produto"
                  style={styles.inputName}
                  autoCorrect={false}
                  value={inputName}
                  onChangeText={ (texto) => setInputName(texto) }
                />
              </View>
            </View>

            <View style={styles.containerTitleValue}>
              <Text style={styles.txtTitleValue}>Valor sugerido</Text>
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
                <FontAwesome5 name="boxes" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                  keyboardType='numeric'
                  placeholder='Quantidade inicial'
                  style={styles.input}
                  autoCorrect={false}
                  value={inputQuantity}
                  onChangeText={ (texto) => setInputQuantity(texto)}
                />
              </View>
            </View>

            <View style={styles.containerFieldFlat}>
              <View style={styles.containerSelectFlat}>
                <View style={styles.containerIcon}>
                  <FontAwesome name="bookmark-o" size={metrics.sizeIcon} color={colors.grey_standard} style={styles.icon}/>
                </View>
                
                <View style={styles.containerInput}>
                  <Text style={styles.inputSelect}>Marca</Text>
                </View>
              </View>

              <View style={styles.containerSelectedFlat}>
                <Text>Selecione: </Text>
              </View>

              <View style={styles.containerFlatList}>
                <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={categoryList}
                keyExtractor={item => item}
                renderItem={( { item } ) => {
                  return(
                    <TouchableOpacity style={styleBtnAddCategory(item)} onPress={ () => selectAddCategory(item)}>
                      <Text style={styleTxtAddCategory(item)}>{item}</Text>
                    </TouchableOpacity>
                  )
                }}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.btnConfirm} onPress={()=>{addProduct()}}>
              <AntDesign name="check" size={metrics.sizeIcon} color={colors.white_standard}/>
            </TouchableOpacity> 
            
            <View style={{height:350}}/>
          </View>
        </ScrollView>
      </Modal>

      <Modal animationType="slide" transparent={false} visible={openProductModal}>
        <View style={styles.containerHeader_secondaryRounded}>
          <View style={styles.headerTitle_secondaryFull}>
            <View style={styles.headerTitle_withButton}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ () => closeProductModal() }>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_standard} />
              </TouchableOpacity>

              <Text style={styles.txtHeader}>{productSelected.name}</Text>
            </View>

            <View style={styles.headerTitle_buttons}>
              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => deleteProduct() }>
                <FontAwesome name="trash-o" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity>         
              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => modifyProduct() }>
                <Feather name="edit" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={{marginBottom: 10}} onPress={ () => setOpenProductHeaderModal(true)}>
              <Ionicons name="chevron-down" size={metrics.sizeIcon+5} color={colors.white_standard}/>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.containerModalWhite}>
          <View style={styles.containerBodyModal}>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', padding: 15 }}>
              <Text style={{ fontWeight: 'bold', fontSize: metrics.font_x_small}}>~~ MOVIMENTAÇÕES ~~</Text>
            </View>

            <View>
              <View style={styles.lineHorizontal}/>

              <View style={styles.containerInitialQuantity}>
                <View style={{ height: 35, borderRightWidth: 1, borderRightColor: '#d89ca1',
                    width: btnVisible ? '72%' : '77%',
                    justifyContent: 'center', alignItems: 'flex-end',
                }}>
                  <Text>Quantidade inicial </Text>
                </View>
                <View style={styles.initialQuantity}>
                  <Text> {productSelected.quantity}</Text>
                </View>
              </View>
            </View>

            <FlatList
              showsVerticalScrollIndicator={false}
              data={showMovementsProduct}
              keyExtractor={item => item}
              renderItem={( { item } ) => {
                return(
                  <View>
                    <View style={styles.lineHorizontal}/>

                    <View style={selectStyle(1, item)}>





                    </View>
                  </View>
                )
              }}
            />
            <View style={styles.lineHorizontal}/>
            <View style={{height: 35}}/>

            <View style={{flexDirection: 'row',  marginLeft: metrics.margin, marginRight: metrics.margin }}>
              <View style={{width: "13%"}}></View>
              
              <View style={selectStyle(2)}>
                <Text style={{fontWeight: 'bold', fontSize: metrics.font_x_small}}>TOTAL EM ESTOQUE: </Text>
              </View>
              <View style={selectStyle(4)}>
                <Text> {productSelected.sumQuantity}</Text>
              </View>
            </View>

            <View style={{height:10}}/>
          </View>
        </ScrollView>
      </Modal>

      <Modal animationType="fade" transparent={true} visible={openProductHeaderModal}>
        <View style={{height: 150, backgroundColor: colors.green_standard, borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', height: 50}}>
            <View style={styles.headerTitle_withButton}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ () => closeProductModal() }>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_standard} />
              </TouchableOpacity>

              <Text style={styles.txtHeader}>Dados do produto</Text>
            </View>

            <View style={styles.headerTitle_buttons}>
              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => deleteProduct() }>
                <FontAwesome name="trash-o" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity>         
              <TouchableOpacity style={styles.btnFilters_primary} onPress={ () => modifyProduct() }>
                <Feather name="edit" size={metrics.sizeIcon} color={colors.white_standard}/>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.productHeaderModalOne}>
            <Text style={styles.titleTxtModal}>Nome: </Text>
            <Text numberOfLines={1} style={{color: colors.white_standard}}>{productSelected.name}</Text>
          </View>

          <View style={styles.productHeaderModalOne}>
            <Text style={styles.titleTxtModal}>Marca: </Text>
            <View style={styles.containerCategory}>
              <Text numberOfLines={1} style={{color: colors.white_standard}}>{productSelected.category}</Text>
            </View>
          </View>

          <View style={styles.productHeaderModalOne}>
            <View style={{width: '50%', flexDirection: 'row'}}>
              <Text style={styles.titleTxtModal}>Valor: </Text>
              <Text numberOfLines={1} style={{color: colors.white_standard}}>R$ {productSelected != 0 ? productSelected.value.toFixed(2).replace(".", ",") : ""}</Text>
            </View>
            <View style={{width: '50%', flexDirection: 'row'}}>
              <Text style={styles.titleTxtModal}>Quantidade: </Text>
              <Text numberOfLines={1} style={{color: colors.white_standard}}>{productSelected.sumQuantity}</Text>
            </View>
          </View>
        </View>

        <View style={{flex: 1}}>
          <TouchableOpacity style={{height:"100%"}} onPress={ () => setOpenProductHeaderModal(false)} />
        </View>
      </Modal>
    </SafeAreaView>
  );
}
