import React, { useContext } from 'react';
import { StatusBar, SafeAreaView, View, Text, TouchableOpacity, Image, Alert } from 'react-native';

import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import AuthContext from '../../contexts/auth';
import styles from './styles';
import { colors, metrics } from '../../styles';

export default function DashBoardPage({ navigation, route }) {
  const { signOut, userName } = useContext(AuthContext);

  function logout() {
    Alert.alert(
      "Sair",
      "Ao encerrar a sessão, tenha ceteza de sincronizar seu dispositivo com a nuvem. Deseja sair?",
      [
        {
          text: "NÃO",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "SIM", onPress: () => signOut() },
      ]
    );
  }

  return(
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={colors.blue_standard} style="light-content" />
      <View style={styles.containerHeader_primary}>
        <View style={styles.containerLineOne}>
          <View style={{ width: '90%', alignItems: 'flex-start' }}>
            <Text style={styles.txtBoldWhite}>Olá {userName}</Text>
          </View>
          
          <View style={{ width: '10%', alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.buttonLogout} onPress={() => { logout() }}>
              <Text style={styles.iconButtonLogout}>
                <MaterialCommunityIcons 
                  name="location-exit" 
                  size={metrics.sizeIcon} 
                  color={colors.white_standard}
                />
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerLineTwo}>
          <View style={{ width: '35%', alignItems: 'flex-end' }}>
            <TouchableOpacity style={styles.btnMenu}>
              <Ionicons name={'chevron-back'} size={metrics.sizeIcon} color={colors.white_standard}/>
            </TouchableOpacity>
          </View>

          <View style={{ width: '30%', alignItems: 'center' }}>
            <Text style={styles.txtBoldWhite}>Mês Atual</Text>
          </View>

          <View style={{ width: '35%', alignItems: 'flex-start' }}>
            <TouchableOpacity style={styles.btnMenu}>
              <Ionicons name={'chevron-forward'} size={metrics.sizeIcon} color={colors.white_standard}/>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.containerLineThree}>
          <View style={styles.containerGain}>
            <View style={{marginRight: 7}}>
              <Image style={{height: 35, width: 35}} source={require('../../../assets/images/arrow-up-circle.png')} />
            </View>

            <View>
              <Text style={styles.txtBoldWhite}>Receitas </Text>
              <Text style={styles.txtBoldGreen}>R$9999,99</Text>
            </View>
          </View>

          <View style={styles.containerGain}>
            <View style={{marginRight: 7}}>
            <Image style={{height: 35, width: 35}} source={require('../../../assets/images/arrow-down-circle.png')} />
            </View>

            <View>
              <Text style={styles.txtBoldWhite}>Despesas</Text>
              <Text style={styles.txtBoldRed}>R$0,00</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.containerBody_Dashboard}>
        <Text>DashBoardPage</Text>
      </View>
    </SafeAreaView>
  );
}
