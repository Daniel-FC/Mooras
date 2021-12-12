import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, Image }  from 'react-native';

import { MaterialCommunityIcons } from "@expo/vector-icons";

import AuthContext from '../../contexts/auth';
import styles from './styles';

export default function LoginPage({ navigation }) {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState("");

  async function loginFirebase() {
    let error = await signIn(email, password);
    if(error) {
      setErrorLogin(true);
    }
  } 

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

      {errorLogin === true
      ?
      <View style={styles.containerAlert}>
        <MaterialCommunityIcons name="alert-circle" size={25} color="#ff6666"/>
        <Text style={styles.txtAlert}>E-mail ou senha inválido(s)</Text>
      </View>
      :
      <View/>}
      
      {email === "" || password === ""
      ?
      <TouchableOpacity style={styles.btnLogin} disabled={true} >
        <Text style={styles.txtBoldWhite}>Login</Text>
      </TouchableOpacity>
      :
      <TouchableOpacity style={styles.btnLogin} onPress={loginFirebase}>
        <Text style={styles.txtBoldWhite}>Login</Text>
      </TouchableOpacity>}

      <Text style={styles.registration}>não possui um registro? <Text> </Text>
        <Text style={styles.linkSubscribe} onPress={() => navigation.navigate("RegisterPage")}>
          se inscreva agora...
        </Text>
      </Text>

      <View style={{height:100}}/>
    </KeyboardAvoidingView>
  );
}
