import * as React from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as Animatable from  'react-native-animatable';

import styles from './styles';

export default function RegisterScreen() {
  return (
    <KeyboardAvoidingView style={styles.container}>
      {/*=============================LOGO===================================*/}
      <Animatable.View style={styles.containerLogo}
      animation="bounceInUp"
      duration={1500}
      useNativeDriver
      >
        <Image style={styles.imageLogo} source={require('../../../assets/adaptive-icon.png')} />
      </Animatable.View>

      {/*=============================BODY===================================*/}
      <Animatable.View style={styles.containerBody}
      animation="bounceIn"
      useNativeDriver>
        {/*=============================TITLE================================*/}
        <Text style={styles.txtTitle}>É hora de iniciar sua jornada!</Text>

        {/*=============================INPUTS===============================*/}
        <TextInput
        placeholder="Nome"
        style={styles.input}
        autoCorrect={false}
        onChangeText={ () => {} }>
        </TextInput>

        <TextInput
        placeholder="E-mail"
        style={styles.input}
        autoCorrect={false}
        onChangeText={ () => {} }>
        </TextInput>

        <TextInput
        placeholder="Senha"
        style={styles.input}
        autoCorrect={false}
        onChangeText={ () => {} }>
        </TextInput>

        {/*=============================BUTTON===============================*/}
        <TouchableOpacity style={styles.btnUser}>
          <Text style={styles.txtBoldWhite}>Cadastrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}
