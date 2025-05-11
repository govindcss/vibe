
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { GradientButtonNative } from '../shared/GradientButtonNative';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';

const signupFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
  confirmPassword: z.string(),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupFormSchema>;

interface SignupFormProps {
  onSubmit: (data: SignupFormValues) => void;
  isLoading?: boolean;
}

export function SignupFormNative({ onSubmit, isLoading }: SignupFormProps) {
  const { theme } = useTheme();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();
  const { control, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  const styles = StyleSheet.create({
    formContainer: { width: '100%' },
    inputContainer: { marginBottom: 16 },
    label: {
      fontSize: 16, fontFamily: 'Inter-SemiBold', color: theme.colors.foreground, marginBottom: 8, flexDirection: 'row', alignItems: 'center',
    },
    labelText: { marginLeft: 8 },
    input: {
      backgroundColor: theme.colors.input, color: theme.colors.foreground, borderWidth: 1,
      borderColor: theme.colors.border, borderRadius: theme.radius, paddingHorizontal: 16,
      paddingVertical: 12, fontSize: 16, fontFamily: 'Inter-Regular',
    },
    inputError: { borderColor: theme.colors.destructive },
    errorMessage: { color: theme.colors.destructive, fontSize: 12, fontFamily: 'Inter-Regular', marginTop: 4 },
    checkboxContainer: {
      flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border,
      backgroundColor: theme.colors.card, borderRadius: theme.radius, padding: 16, marginBottom: 16,
    },
    checkboxLabelContainer: { marginLeft: 12, flex: 1 },
    checkboxLabel: { color: theme.colors.foreground, fontSize: 14, fontFamily: 'Inter-Regular' },
    linkText: { color: theme.colors.primary, textDecorationLine: 'underline' },
    orContinueContainer: {
      marginVertical: 24, flexDirection: 'row', alignItems: 'center',
    },
    divider: { flex: 1, height: 1, backgroundColor: theme.colors.border, },
    orText: { marginHorizontal: 8, color: theme.colors.mutedForeground, fontSize: 12, fontFamily: 'Inter-Regular', textTransform: 'uppercase' },
    socialButton: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent',
      borderWidth: 1, borderColor: theme.colors.input, borderRadius: theme.radius, paddingVertical: 12, marginBottom: 12,
    },
    socialButtonText: { color: theme.colors.foreground, marginLeft: 10, fontSize: 16, fontFamily: 'Inter-SemiBold' },
    loginTextContainer: { marginTop: 24, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
    loginText: { color: theme.colors.mutedForeground, fontSize: 14, fontFamily: 'Inter-Regular' },
    loginLink: { color: theme.colors.primary, fontWeight: 'bold', textDecorationLine: 'underline', marginLeft: 4 }
  });


  return (
    <View style={styles.formContainer}>
      <View style={styles.inputContainer}>
        <View style={styles.label}><Feather name="user" size={16} color={theme.colors.primary} /><Text style={styles.labelText}>Full Name</Text></View>
        <Controller control={control} name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={[styles.input, errors.fullName && styles.inputError]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="Alex Wave Rider" placeholderTextColor={theme.colors.mutedForeground} />
          )}
        />
        {errors.fullName && <Text style={styles.errorMessage}>{errors.fullName.message}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.label}><Feather name="mail" size={16} color={theme.colors.primary} /><Text style={styles.labelText}>Email</Text></View>
        <Controller control={control} name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={[styles.input, errors.email && styles.inputError]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="you@example.com" placeholderTextColor={theme.colors.mutedForeground} keyboardType="email-address" autoCapitalize="none" />
          )}
        />
        {errors.email && <Text style={styles.errorMessage}>{errors.email.message}</Text>}
      </View>

      <View style={styles.inputContainer}>
         <View style={styles.label}><Feather name="lock" size={16} color={theme.colors.primary} /><Text style={styles.labelText}>Password</Text></View>
        <Controller control={control} name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={[styles.input, errors.password && styles.inputError]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="Create a strong password" placeholderTextColor={theme.colors.mutedForeground} secureTextEntry />
          )}
        />
        {errors.password && <Text style={styles.errorMessage}>{errors.password.message}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.label}><Feather name="lock" size={16} color={theme.colors.primary} /><Text style={styles.labelText}>Confirm Password</Text></View>
        <Controller control={control} name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={[styles.input, errors.confirmPassword && styles.inputError]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="Confirm your password" placeholderTextColor={theme.colors.mutedForeground} secureTextEntry />
          )}
        />
        {errors.confirmPassword && <Text style={styles.errorMessage}>{errors.confirmPassword.message}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Controller
          control={control}
          name="agreeToTerms"
          render={({ field: { onChange, value } }) => (
            <View style={styles.checkboxContainer}>
              <Switch
                trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
                thumbColor={value ? theme.colors.primaryForeground : theme.colors.mutedForeground}
                ios_backgroundColor={theme.colors.muted}
                onValueChange={onChange}
                value={value}
              />
              <View style={styles.checkboxLabelContainer}>
                <Text style={styles.checkboxLabel}>
                  I agree to the VibeWave <Text style={styles.linkText} onPress={() => console.log("Terms")}>Terms of Service</Text> and <Text style={styles.linkText} onPress={() => console.log("Privacy")}>Privacy Policy</Text>.
                </Text>
              </View>
            </View>
          )}
        />
        {errors.agreeToTerms && <Text style={styles.errorMessage}>{errors.agreeToTerms.message}</Text>}
      </View>

      <GradientButtonNative onPress={handleSubmit(onSubmit)} disabled={isLoading} title={isLoading ? "Creating Account..." : "Create Account"} />

      <View style={styles.orContinueContainer}>
        <View style={styles.divider} /><Text style={styles.orText}>Or sign up with</Text><View style={styles.divider} />
      </View>

      <TouchableOpacity style={styles.socialButton} onPress={() => console.log('Google Sign Up')}>
        <Feather name="chrome" size={20} color={theme.colors.foreground} />
        <Text style={styles.socialButtonText}>Sign up with Google</Text>
      </TouchableOpacity>

      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Log In <Feather name="log-in" size={14}/></Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
