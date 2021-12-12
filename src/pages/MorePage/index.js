import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Modal, FlatList, TextInput, Alert } from 'react-native';

import { Ionicons, AntDesign, FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

import AuthContext from '../../contexts/auth';
import styles from './styles';
import { colors, metrics } from '../../styles';

export default function MorePage({ navigation, route }) {
  const { synchronizeFirebase, changeTagList, changeCategoryList, tagList, categoryList } = useContext(AuthContext);
  const [errorAdd, setErrorAdd] = useState("");
  
  const [tags, setTags] = useState([]);
  const [openTag, setOpenTag] = useState(false);
  
  const [categorys, setCategorys] = useState([]);
  const [openCategory, setOpenCategory] = useState(false);

  const [newTagCategory, setNewTagCategory] = useState(null);
  const [oldTagCategory, setOldTagCategory] = useState(null);
  const [titleTxt, setTitleTxt] = useState("");
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(()=>{
    if(categoryList == null){
      setCategorys([]);
    } else {
      setCategorys(categoryList);
    }
    if(tagList == null){
      setTags([]);
    } else {
      setTags(tagList);
    }
  }, []);

  function synchronize() {
    synchronizeFirebase();
  }

  function closeModalTagCategory(){
    setOpenTag(false);
    setOpenCategory(false);
  }

  function addTag() {
    let close = true;
    if(newTagCategory.length < 15) {
      if(oldTagCategory != null){
        let temp = [];
        for(const name in tags){
          if(tags[name]==oldTagCategory){
            temp.push(newTagCategory);
          } else {
            temp.push(tags[name]);
          }
        }
        setTags(temp);
        changeTagList(temp, oldTagCategory, newTagCategory);
      } else {
        if(tags.indexOf(newTagCategory) == -1) {
          let temp = tags.slice();
          temp.push(newTagCategory);
          setTags(temp);
          changeTagList(temp, null, null)
        } else {
          setErrorAdd("Este grupo já foi cadastrado");
          close = false;
        }
      }
    } else {
      setErrorAdd("O número máximo de caractes é 14");
      close = false;
    }

    if(close){
      closeAddTagCategory();
    }
  }

  function addCategory() {
    let close = true;
    if(newTagCategory.length < 15) {
      if(oldTagCategory != null) {
        let temp = [];
        for(const name in categorys){
          if(categorys[name]==oldTagCategory){
            temp.push(newTagCategory);
          } else {
            temp.push(categorys[name]);
          }
        }
        setCategorys(temp);
        changeCategoryList(temp, oldTagCategory, newTagCategory);
      } else {
        if(categorys.indexOf(newTagCategory) == -1) {
          let temp = categorys.slice();
          temp.push(newTagCategory);
          setCategorys(temp);
          changeCategoryList(temp, null, null);
        } else {
          setErrorAdd("Esta marca já foi cadastrada");
          close = false;
        }
      }
    } else {
      setErrorAdd("O número máximo de caractes é 14");
      close = false;
    }
 
    if(close){
      closeAddTagCategory();
    }
  }

  function deleteTag(item) {
    function del() {
      let temp = tags.slice();
      temp.splice(temp.indexOf(item), 1);
      setTags(temp);
      changeTagList(temp, item, null);
    }

    Alert.alert(
      "Deletar",
      "Tem certeza que deseja deletar este grupo? ¨" + item + "¨",
      [
        { text: "NÃO", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "SIM", onPress: () => del() },
      ]
    );
  }

  function deleteCategory(item) {
    function del() {
      let temp = categorys.slice();
      temp.splice(temp.indexOf(item), 1);
      setCategorys(temp);
      changeCategoryList(temp, item, null);
    }

    Alert.alert(
      "Deletar",
      "Tem certeza que deseja deletar esta marca? ¨" + item + "¨",
      [
        { text: "NÃO", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        { text: "SIM", onPress: () => del() },
      ]
    );    
  }  

  function closeAddTagCategory(){
    setOpenAddModal(false);
    setNewTagCategory(null);
    setOldTagCategory(null);
    setErrorAdd("");
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader_More}>
        <View style={styles.containerLineOne}>
          <Text style={styles.txtRegularBlack}>Mais opções</Text>
        </View>
        <View style={styles.containerLineTwo}>
          <Text style={styles.txtBoldBlack}>Gerenciar</Text>
        </View>
      </View>

      <View style={styles.containerBody_More}>
        <TouchableOpacity style={styles.containerElements} onPress={ synchronize }>
          <View style={styles.containerIcon}>
            <Ionicons name="sync" size={metrics.sizeIcon} color={colors.grey_standard}/>
          </View>
          <View style={styles.containerTitleMenu}>
            <Text style={styles.txtBoldGray}>Sincronizar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerElements} onPress={ () => setOpenTag(true) }>
          <View style={styles.containerIcon}>
            <AntDesign name="tago" size={metrics.sizeIcon} color={colors.grey_standard}/>
          </View>
          <View style={styles.containerTitleMenu}>
            <Text style={styles.txtBoldGray}>Grupos</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.containerElements} onPress={ () => setOpenCategory(true) }>
          <View style={styles.containerIcon}>
            <FontAwesome name="bookmark-o" size={metrics.sizeIcon} color={colors.grey_standard}/>
          </View>
          <View style={styles.containerTitleMenu}>
            <Text style={styles.txtBoldGray}>Marcas</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={false} visible={openTag}>
        <View style={styles.containerModal}>
          <View style={styles.containerHeader_secondary}>
            <View style={styles.headerTitle_secondary}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ () => closeModalTagCategory() }>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_standard} />
              </TouchableOpacity>
              <Text style={styles.txtHeader}>Grupos</Text>
            </View>

            <View style={styles.headerButton_secondary}>
              <TouchableOpacity style={styles.btnAdd} onPress={ () => (setOpenAddModal(true), setTitleTxt("Adicionar novo grupo")) }>
                <Text style={styles.iconButtonAdd}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.headerFake_secondary}/>
          </View>

          <View style={styles.containerBodyModal}>
            <View style={{height:10}}/>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={tags}
              keyExtractor={item => item}
              renderItem={( { item } ) => {
                return(
                  <View style={styles.containerTagsCategorys}>
                    <View style={styles.containerTxtTagCategorys}>
                      <Text style={styles.txtTagCategory}> { item } </Text>
                    </View>

                    <View style={styles.containerIconTagCategory}>
                      <TouchableOpacity onPress={ () => deleteTag(item) }>
                        <FontAwesome name="trash-o" size={metrics.sizeIcon} color={colors.grey_standard}/>
                      </TouchableOpacity>
                      <View style={{width: '10%'}}></View>
                      <TouchableOpacity onPress={ () => (setOpenAddModal(true), setNewTagCategory(item), setOldTagCategory(item), setTitleTxt("Editar grupo")) }>
                        <Feather name="edit" size={metrics.sizeIcon} color={colors.grey_standard}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }}
            />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={false} visible={openCategory}>
        <View style={styles.containerModal}>
          <View style={styles.containerHeader_secondary}>
            <View style={styles.headerTitle_secondary}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ () => closeModalTagCategory() }>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_standard} />
              </TouchableOpacity>
              <Text style={styles.txtHeader}>Marcas</Text>
            </View>

            <View style={styles.headerButton_secondary}>
              <TouchableOpacity style={styles.btnAdd} onPress={ () => (setOpenAddModal(true), setTitleTxt("Adicionar nova marca")) }>
                <Text style={styles.iconButtonAdd}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.headerFake_secondary}/>
          </View>

          <View style={styles.containerBodyModal}>
            <View style={{height:10}}/>
            <FlatList
              showsVerticalScrollIndicator={false}
              data={categorys}
              keyExtractor={item => item}
              renderItem={( { item } ) => {
                return(
                  <View style={styles.containerTagsCategorys}>
                    <View style={styles.containerTxtTagCategorys}>
                      <Text style={styles.txtTagCategory}> { item } </Text>
                    </View>

                    <View style={styles.containerIconTagCategory}>
                      <TouchableOpacity onPress={ () => deleteCategory(item) }>
                        <FontAwesome name="trash-o" size={metrics.sizeIcon} color={colors.grey_standard}/>
                      </TouchableOpacity>
                      <View style={{width: '10%'}}></View>
                      <TouchableOpacity onPress={ () => (setOpenAddModal(true), setNewTagCategory(item), setOldTagCategory(item), setTitleTxt("Editar marca")) }>
                        <Feather name="edit" size={metrics.sizeIcon} color={colors.grey_standard}/>
                      </TouchableOpacity>
                    </View>
                  </View>
                )
              }}
            />
          </View>
        </View>
      </Modal>
      
      <Modal animationType="slide" transparent={true} visible={openAddModal}>
        <View style={{ flex: 3 }}>
          <TouchableOpacity style={{height:"100%"}} onPress={closeAddTagCategory}/>
        </View>

        <View style={styles.containerModalAdd}>
          <View style={styles.containerModalAddTitle}>
            <Text style={styles.txtBoldWhite}>{titleTxt}</Text>
          </View>

          <View style={styles.containerModalAddInput}>
            <TextInput
              placeholder="Descrição"
              placeholderTextColor={colors.grey_icon}
              style={styles.input}
              onChangeText={setNewTagCategory}
              value={newTagCategory}
              >
            </TextInput>
          </View>

          {errorAdd != 0
          ?
          <View style={styles.containerAlert}>
            <MaterialCommunityIcons name="alert-circle" size={25} color="#ff6666"/>
            <Text style={styles.txtAlert}>{errorAdd}</Text>
          </View>
          :
          <View></View>
          }

          <View style={styles.containerModalAddButtons}>
            <TouchableOpacity style={styles.btnModalAddCancel} onPress={closeAddTagCategory}>
              <Text style={{color: '#60a962'}}>CANCELAR</Text>
            </TouchableOpacity>
            <View style={{width:'2%'}}></View>
            
            {openTag === true
            ?
            <TouchableOpacity style={styles.btnModalAddConcluido} onPress={()=>{addTag()}}>
              <Text style={{color: '#ffffff'}}>CONCLUÍDO</Text>
            </TouchableOpacity>
            :
            <TouchableOpacity style={styles.btnModalAddConcluido} onPress={()=>{addCategory()}}>
              <Text style={{color: '#ffffff'}}>CONCLUÍDO</Text>
            </TouchableOpacity>
            }
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
