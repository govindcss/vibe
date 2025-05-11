
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';

interface GradientButtonProps {
  onPress: () => void;
  title?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

export const GradientButtonNative: React.FC<GradientButtonProps> = ({
  onPress,
  title,
  style,
  textStyle,
  disabled,
  icon,
  isLoading,
}) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled || isLoading} style={[styles.touchable, style]}>
      <LinearGradient
        colors={disabled || isLoading ? [theme.colors.muted, theme.colors.muted] : [theme.colors.primary, theme.colors.accent, theme.colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, { borderRadius: style?.borderRadius || theme.radius }]}
      >
        {isLoading ? (
          <ActivityIndicator color={theme.colors.primaryForeground} />
        ) : (
          <View style={styles.contentContainer}>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            {title && <Text style={[styles.text, { color: theme.colors.primaryForeground }, textStyle]}>{title}</Text>}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // For Android
  },
  gradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
  },
});
