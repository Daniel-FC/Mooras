import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image }  from 'react-native';

import { MaterialCommunityIcons } from "@expo/vector-icons";

import AuthContext from '../../contexts/auth';
import styles from './styles';
import { translate } from '../../utils';

export default function RegisterPage({ navigation }) {
  const { registerUser } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMensager, setErrorMensager] = useState('');
  const [errorRegister, setErrorRegister] = useState('');

  async function register() {
    let error = await registerUser(name, email, password);
    if(!(error === undefined)) {
      setErrorMensager(translate(error));
      setErrorRegister(true);
    }
  };

  return(
    <KeyboardAvoidingView 
    style={styles.container} 
    behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <View style={styles.containerPrologue}>
        <View style={styles.containerPLeft}>
          <Image style={styles.imgLogo} source={require('../../../assets/adaptive-icon.png')} />
        </View>
        <View style={styles.containerPRight}>
          <Text style={styles.txtTitle}>Mooras</Text>
          <Text style={styles.txtSubTitle}>Mobilidade nas alturas</Text>          
        </View>
      </View>

      <TextInput
        placeholder="Nome"
        style={styles.input}
        autoCorrect={false}
        value={name}
        onChangeText={ (texto) => setName(texto) }>
      </TextInput>

      <TextInput
        placeholder="E-mail"
        style={styles.input}
        autoCorrect={false}
        autoCapitalize = "none"
        value={email}
        onChangeText={ (texto) => setEmail(texto) }>
      </TextInput>

      <TextInput
        placeholder="Senha"
        style={styles.input}
        autoCorrect={false}
        secureTextEntry={true}
        value={password}
        onChangeText={ (texto) => setPassword(texto)}>
      </TextInput>

      {errorRegister === true
      ?
      <View style={styles.containerAlert}>
        <MaterialCommunityIcons name="alert-circle" size={25} color="#ff6666"/>
        <Text style={styles.txtAlert}>{errorMensager}</Text>
      </View>
      :
      <View/>}
      
      {email === "" || password === ""
      ?
      <TouchableOpacity style={styles.btnRegister} disabled={true} >
        <Text style={styles.txtBoldWhite}>Registrar</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity style={styles.btnRegister} onPress={register}>
        <Text style={styles.txtBoldWhite}>Registrar</Text>
      </TouchableOpacity>}

      <Text style={styles.registration}>já possui registro? <Text> </Text>
        <Text style={styles.linkSubscribe} onPress={() => navigation.navigate("RegisterPage")}>
          faça login...
        </Text>
      </Text>

      <View style={{height:100}}/>

    </KeyboardAvoidingView>
  );
}
