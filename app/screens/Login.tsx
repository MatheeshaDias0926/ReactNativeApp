import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const auth = FIREBASE_AUTH

  const signIn = async()=>{
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth ,email, password);
      console.log(response);
   } catch (error:any) {
    console.log(error);
    alert("sign in failed"+error.message);

  }finally{
    setLoading(false);
  }
}
////////////////////////////////////////////////////////////////////////
const signUp = async()=>{
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log(response);
      alert("check ur email");

   } catch (error:any) {
    console.log(error);
    alert("sign in failed"+error.message);

  }finally{
    setLoading(false);
  }
}
 
  const handleLogin = () => {
    // Perform login logic here
    Alert.alert('Login Details', `Email: ${email}, Password: ${password}`);
  };

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView behavior='padding'>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry ={true}
        autoCapitalize="none"
      />
      {loading?(
        <ActivityIndicator size="large" color="red" />
      ):(
        <>
              <Button title="Login" onPress={signIn} />
              <Button title="create account" onPress={signUp} />

        </>
      )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
