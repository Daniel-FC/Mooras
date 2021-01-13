import * as React from 'react';
import { KeyboardAvoidingView, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import * as Animatable from  'react-native-animatable';

import AuthContext from '../../contexts/auth';
import styles from './styles';

export default function RegisteredScreen() {
  const { signed, signIn } = React.useContext(AuthContext);

  function handleSignIn() {
    signIn();
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      {/*=============================LOGO===================================*/}
      <Animatable.View style={styles.containerLogo}
      animation="bounceInUp"
      duration={1500}
      useNativeDriver>
        <Image style={styles.imageLogo} source={require('../../../assets/adaptive-icon.png')} />
      </Animatable.View>

      {/*=============================BODY===================================*/}
      <Animatable.View style={styles.containerBody}
      animation="bounceIn"
      useNativeDriver>
        {/*=============================TITLE================================*/}
        <Text style={styles.txtTitle}>Bem-vindo de volta!</Text>

        {/*=============================INPUTS===============================*/}
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
        <TouchableOpacity style={styles.btnUser} onPress={ handleSignIn }>
          <Text style={styles.txtBoldWhite}>Entrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}
