import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useAuth, useOAuth, useSignUp } from '@clerk/clerk-expo';

export default function Register() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' });
  const { isSignedIn } = useAuth();
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  // Redirect if the user is already signed in
  React.useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.replace('/(tabs)'); // Redirect to home if already signed in
    }
  }, [isLoaded, isSignedIn, router]);

  const onSignUpPress = React.useCallback(async () => {
      if (!isLoaded || !setActive) return;
    
      setLoading(true);
      try {
        const signUpAttempt = await signUp.create({
            emailAddress: emailAddress,
          password,
        });
    
        if (signUpAttempt.status === 'complete' && setActive) {
          await setActive({ session: signUpAttempt.createdSessionId });
          router.replace('/(tabs)'); // Redirect to '/home' after login
        } else {
          console.error(JSON.stringify(signUpAttempt, null, 2));
        }
      } catch (err: any) {
        console.error(JSON.stringify(err, null, 2));
      } finally {
        setLoading(false);
      }
    }, [isLoaded, setActive, emailAddress, password]);

    const onGoogleSignUpPress = async () => {
        if (!setActive) return; // Ensure setActive is defined
      
        try {
          const { createdSessionId } = await startOAuthFlow();
          if (createdSessionId) {
            await setActive({ session: createdSessionId });
            router.replace('/(tabs)'); 
          }
        } catch (error) {
          console.error('OAuth error:', error);
        }
    };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to start your fitness journey</Text>
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
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="rgba(255,255,255,0.6)" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.6)"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={onSignUpPress}
          disabled={loading}
          activeOpacity={0.8}>
          <Text style={styles.buttonText}>{loading ? 'Signing Up...' : 'Sign Up'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={onGoogleSignUpPress}
          activeOpacity={0.8}>
          <Ionicons name="logo-google" size={20} color="#fff" />
          <Text style={styles.googleButtonText}>Sign Up with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginAccount}
          onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.loginAccountText}>
            Already have an account? <Text style={styles.loginAccountTextBold}>Login</Text>
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
  googleButton: {
    backgroundColor: '#DB4437',
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    flexDirection: 'row',
  },
  googleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginLeft: 12,
  },
  loginAccount: {
    alignItems: 'center',
  },
  loginAccountText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  loginAccountTextBold: {
    color: '#4ADE80',
    fontFamily: 'Inter-Bold',
  },
});
