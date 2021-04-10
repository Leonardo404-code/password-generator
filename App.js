import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

export default function App(){
  
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(5);
  const [copied, setCopied] = useState(false);
  
  function generatePass(){
    let pass = '';
    for(let i = 0, n = charset.length; i < size; i++){
      pass += charset.charAt(Math.floor(Math.random() * n))
    }
    setPassword(pass);
  }

  function copyPass(){
    Clipboard.setString(password);
    setCopied(true);
  }

  return(
    <View style={styles.container}>
      <Text style={styles.Title}>Gerador de senha</Text>
      <Image source={require('./src/images/logo.png')}
      style={styles.logo} 
      />
      <Text style={styles.subTitle}>{size} Caracteres</Text>
      <View style={styles.area} >
        <Slider style={{height: 50}}
        minimumValue={5}
        maximumValue={15}
        value={size}
        onValueChange={(value) => setSize(value.toFixed(0))}
        minimumTrackTintColor='#ff0000'
        maximumTrackTintColor='#000' 
        
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatePass}>
          <Text style={styles.buttonText}> Gerar Senha </Text>
      </TouchableOpacity>

      {password !== '' && (
        <>
        <View style={styles.area}>
          <Text style={styles.password} onLongPress={copyPass}>{password}</Text>
        </View>
        
        <View> 
          {copied ? (
            <Text>Texto copiado para a clipboard</Text>
          ) : null}
        </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3ff'
  },

  logo: {
    marginBottom: 60,
  },

  Title: {
    fontSize: 40,
    marginBottom: 50,
  },

  subTitle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: '#FFF',
    width: '90%',
    borderRadius: 10
  },

  button:{
    backgroundColor: '#FFA200',
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 25
  },

  buttonText: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold'
  },

  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
  }
});
