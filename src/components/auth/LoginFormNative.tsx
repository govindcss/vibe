
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { GradientButtonNative } from '../shared/GradientButtonNative';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';


const loginFormSchema = z.object({
  emailOrPhone: z.string().min(1, "Email or phone number is required."),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

interface LoginFormProps {
  onSubmit: (data: LoginFormValues) => void;
  isLoading?: boolean;
}

export function LoginFormNative({ onSubmit, isLoading }: LoginFormProps) {
  const { theme } = useTheme();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const { control, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  const styles = StyleSheet.create({
    formContainer: {
      width: '100%',
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.foreground,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    labelText: {
      marginLeft: 8,
    },
    input: {
      backgroundColor: theme.colors.input,
      color: theme.colors.foreground,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius,
      paddingHorizontal: 16,
      paddingVertical: 12,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
    },
    inputError: {
      borderColor: theme.colors.destructive,
    },
    errorMessage: {
      color: theme.colors.destructive,
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      marginTop: 4,
    },
    forgotPasswordContainer: {
      alignItems: 'flex-end',
      marginBottom: 16,
    },
    forgotPasswordText: {
      color: theme.colors.primary,
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      textDecorationLine: 'underline',
    },
    orContinueContainer: {
      marginVertical: 24,
      flexDirection: 'row',
      alignItems: 'center',
    },
    divider: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    orText: {
      marginHorizontal: 8,
      color: theme.colors.mutedForeground,
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      textTransform: 'uppercase',
    },
    socialButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.input,
      borderRadius: theme.radius,
      paddingVertical: 12,
      marginBottom: 12,
    },
    socialButtonText: {
      color: theme.colors.foreground,
      marginLeft: 10,
      fontSize: 16,
      fontFamily: 'Inter-SemiBold',
    },
    signupTextContainer: {
      marginTop: 24,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    signupText: {
      color: theme.colors.mutedForeground,
      fontSize: 14,
      fontFamily: 'Inter-Regular',
    },
    signupLink: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      textDecorationLine: 'underline',
      marginLeft: 4,
    }
  });

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.label}>
          <Feather name="mail" size={16} color={theme.colors.primary} />
          <Text style={[styles.labelText, {color: theme.colors.foreground}]}>Email or Phone</Text>
        </View>
        <Controller
          control={control}
          name="emailOrPhone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.emailOrPhone && styles.inputError]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="you@example.com or +1234567890"
              placeholderTextColor={theme.colors.mutedForeground}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.emailOrPhone && <Text style={styles.errorMessage}>{errors.emailOrPhone.message}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.label}>
          <Feather name="lock" size={16} color={theme.colors.primary} />
          <Text style={[styles.labelText, {color: theme.colors.foreground}]}>Password</Text>
        </View>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="••••••••"
              placeholderTextColor={theme.colors.mutedForeground}
              secureTextEntry
            />
          )}
        />
        {errors.password && <Text style={styles.errorMessage}>{errors.password.message}</Text>}
      </View>
      
      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => console.log('Forgot password pressed')}>
        <Text style={styles.forgotPasswordText}>Forgot password?</Text>
      </TouchableOpacity>

      <GradientButtonNative onPress={handleSubmit(onSubmit)} disabled={isLoading} title={isLoading ? "Logging In..." : "Log In"} />

      <View style={styles.orContinueContainer}>
        <View style={styles.divider} />
        <Text style={styles.orText}>Or continue with</Text>
        <View style={styles.divider} />
      </View>

      <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Google Sign In')}>
        {/* Replace with actual Google SVG or Icon */}
        <Feather name="chrome" size={20} color={theme.colors.foreground} /> 
        <Text style={styles.socialButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <View style={styles.signupTextContainer}>
        <Text style={styles.signupText}>Don&apos;t have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}>Sign Up <Feather name="user-plus" size={14} /></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
