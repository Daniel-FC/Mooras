import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';

import styles from './styles';
import { colors } from '../../styles';

export default function HomePage({ navigation }) {
  return(
    <ScrollView style={styles.container}>
      <StatusBar backgroundColor={colors.backgroundColorHomeScreen} style="light-content" />
      
      <View style={styles.containerTitle}>
        <Text style={styles.txtTitle}>Hora de transformar suas finanças</Text>
      </View>

      <View style={styles.containerMontain}>
        <Image style={styles.imageMontain} source={require('../../../assets/images/montain.png')} />
      </View>

      <View style={styles.containerBody}>
        <Text style={styles.txtBody}>O caminho está a sua frente. Você já deu seu primeiro passo rumo a transformação financeira e nós te guiaremos nessa jornada.</Text> 
        <Animatable.View
        animation="bounceIn"
        useNativeDriver>
          <TouchableOpacity style={styles.btnCadastrar}
          onPress={() => navigation.navigate('RegisterPage')}>
            <Text style={styles.txtBoldWhite}>CADASTRAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCadastrado}
          onPress={() => navigation.navigate('LoginPage')}>
            <Text style={styles.txtBoldWhite}>JÁ SOU CADASTRADO</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ScrollView>
  );
}
