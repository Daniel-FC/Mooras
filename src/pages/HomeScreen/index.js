import * as React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import * as Animatable from  'react-native-animatable';

import styles from './styles';
import { colors } from '../../styles';

export default function HomeScreen( { navigation } ) {
  return (
    <ScrollView style={styles.container}>
      {/*=============================STATUS_BAR=============================*/}
      <StatusBar backgroundColor={colors.backgroundColorHomeScreen} style="light-content" />

      {/*=============================TITLE==================================*/}
      <View style={styles.containerTitle}>
        <Text style={styles.txtTitle}>Hora de transformar suas finanças</Text>
      </View>

      {/*=============================IMAGE_MONTAIN==========================*/}
      <View style={styles.imageContainer}>
        <Image style={styles.imageMontain} source={require('../../../assets/images/montain.png')} />
      </View>

      {/*=============================MOTIVATIONAL_TEXT======================*/}
      <View style={styles.bodyContainer}>
        <Text style={styles.txtBody}>O caminho está a sua frente. Você já deu seu primeiro passo rumo a transformação financeira e nós te guiaremos nessa jornada.</Text> 
        
        {/*=============================BUTTONS==============================*/}
        <Animatable.View
        animation="bounceIn"
        useNativeDriver>
          <TouchableOpacity style={styles.btnCadastrar}
          onPress={() => navigation.navigate('Register')}>
            <Text style={styles.txtBoldWhite}>CADASTRAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnCadastrado}
          onPress={() => navigation.navigate('Registered')}>
            <Text style={styles.txtBoldWhite}>JÁ SOU CADASTRADO</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </ScrollView>
  );
}
