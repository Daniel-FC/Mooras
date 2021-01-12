import * as React from 'react';
import { View, SafeAreaView, Text, TextInput, TouchableOpacity, Switch, Modal } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { Ionicons, FontAwesome, AntDesign, FontAwesome5, Feather } from '@expo/vector-icons';

import styles from './styles';
import { colors, metrics } from '../../styles';

function selectStyleButton(key) {
  if(key==0){return styles.btnDate}
  if(key==1){return styles.btnDateSelected}
}
function selectStyleTxt(key) {
  if(key==0){return styles.txtDate}
  if(key==1){return styles.txtDateSelected}
}

export default function AddSaleScreen() {
  const [open, setOpen] = React.useState(false);
  const [isSwitchEnabled, setSwitch] = React.useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setOpen(true);
    }, [])
  );

  return (
    <View>
      <Modal animationType="slide" transparent={false} visible={open}>
        <SafeAreaView style={styles.container}>
          {/*=============================HEADER=============================*/}
          <View style={styles.containerHeader_secondary}>
            <View style={styles.header_secondary}>
              <TouchableOpacity style={styles.btnReturn_secondary} onPress={ () => setOpen(false) }>
                <Ionicons name="md-arrow-back" size={25} color={colors.white_pattern} />
              </TouchableOpacity>
              <Text style={styles.txtHeader}>Nova venda</Text>
            </View>
          </View>
          {/*=============================BODY===============================*/}
          <View style={styles.containerBody}>

            {/*=============================NAME_VALUE=======================*/}
            <View style={styles.containerNameValue}>
              <Text style={styles.txtNameValue}>Valor da Venda</Text>
            </View>

            {/*=============================VALUE============================*/}
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome name="dollar" size={metrics.sizeIcon} color={colors.grey_pattern} style={styles.iconValue}/>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                placeholder="R$ 0,00"
                style={styles.inputValue}
                autoCorrect={false}
                onChangeText={ () => {} }>
                </TextInput>
              </View>
            </View>

            {/*=============================RECEIVED=========================*/}
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <Feather name="check-circle" size={metrics.sizeIcon} color={colors.grey_pattern} style={styles.icon}/>
              </View>
              <View style={styles.containerReceived}>
                <View style={styles.received}>
                  <Text style={styles.input}>Recebido</Text>
                </View>
                <View style={styles.switch}>
                  <Switch
                    value={isSwitchEnabled}
                    onValueChange={(value) => setSwitch(value)}
                    trackColor={{true: colors.green_pattern, false: colors.grey_pattern}}
                  />
                </View>
              </View>
            </View>

            {/*=============================PRODUCT==========================*/}
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <AntDesign name="inbox" size={metrics.sizeIcon} color={colors.grey_pattern} style={styles.icon}/>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                placeholder="Produto"
                style={styles.input}
                autoCorrect={false}
                onChangeText={ () => {} }>
                </TextInput>
              </View>
            </View>

            {/*=============================DATE=============================*/}
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <FontAwesome5 name="calendar-alt" size={metrics.sizeIcon} color={colors.grey_pattern} style={styles.icon}/>
              </View>
              <View style={styles.containerButtons}>
                <TouchableOpacity style={selectStyleButton(1)}>
                  <Text style={selectStyleTxt(1)}>Hoje</Text>
                </TouchableOpacity>
                <TouchableOpacity style={selectStyleButton(0)}>
                  <Text style={selectStyleTxt(0)}>Ontem</Text>
                </TouchableOpacity>
                <TouchableOpacity style={selectStyleButton(0)}>
                  <Text style={selectStyleTxt(0)}>Outros...</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/*=============================CLIENT===========================*/}
            <View style={styles.containerField}>
              <View style={styles.containerIcon}>
                <Ionicons name="md-person" size={metrics.sizeIcon} color={colors.grey_pattern} style={styles.icon}/>
              </View>
              <View style={styles.containerInput}>
                <TextInput
                placeholder="Cliente"
                style={styles.input}
                autoCorrect={false}
                onChangeText={ () => {} }>
                </TextInput>
              </View>
            </View>

            {/*=============================CONFIRM_BUTTON===================*/}
            <TouchableOpacity style={styles.btnConfirm} onPress={ () => setOpen(false)}>
              <AntDesign name={"check"} size={metrics.sizeIcon} color={colors.white_pattern} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
