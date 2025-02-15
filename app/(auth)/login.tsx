import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function Login() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue your fitness journey</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="rgba(255,255,255,0.6)" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.6)"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="rgba(255,255,255,0.6)" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          style={styles.forgotPassword}
          onPress={() => {}}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/(tabs)')}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createAccount}
          onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.createAccountText}>
            Don't have an account? <Text style={styles.createAccountTextBold}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    marginTop: 60,
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: 'rgba(255,255,255,0.6)',
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    height: 56,
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#fff',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: '#4ADE80',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
  },
  button: {
    backgroundColor: '#4ADE80',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  buttonText: {
    color: '#121212',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  createAccount: {
    alignItems: 'center',
  },
  createAccountText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  createAccountTextBold: {
    color: '#4ADE80',
    fontFamily: 'Inter-Bold',
  },
});