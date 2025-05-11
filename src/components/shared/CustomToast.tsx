
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useToast } from '../../contexts/ToastContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';

const CustomToast: React.FC = () => {
  const { toasts, hideToast } = useToast();
  const { theme } = useTheme();

  if (toasts.length === 0) {
    return null;
  }

  // Display only the latest toast for simplicity, can be expanded to show multiple
  const currentToast = toasts[toasts.length - 1];

  const getBackgroundColor = () => {
    switch (currentToast.type) {
      case 'success':
        return theme.colors.chart5; // Green
      case 'error':
        return theme.colors.destructive;
      case 'info':
        return theme.colors.secondary;
      case 'warning':
        return theme.colors.chart4; // Orange
      default:
        return theme.colors.card;
    }
  };
  
  const getIconName = () => {
     switch (currentToast.type) {
      case 'success':
        return 'check-circle';
      case 'error':
        return 'x-circle';
      case 'info':
        return 'info';
      case 'warning':
        return 'alert-triangle';
      default:
        return 'info';
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.container, { backgroundColor: getBackgroundColor(), borderColor: theme.colors.border }]}>
        <Feather name={getIconName() as any} size={20} color={theme.colors.primaryForeground} style={styles.icon} />
        <View style={styles.textContainer}>
            {currentToast.title && <Text style={[styles.title, { color: theme.colors.primaryForeground }]}>{currentToast.title}</Text>}
            <Text style={[styles.message, { color: theme.colors.primaryForeground }]}>{currentToast.message}</Text>
        </View>
        <TouchableOpacity onPress={() => hideToast(currentToast.id)} style={styles.closeButton}>
          <Feather name="x" size={18} color={theme.colors.primaryForeground} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    top: 0, // Adjust as needed, e.g., for status bar height
    left: 0,
    right: 0,
    zIndex: 1000,
    paddingHorizontal: 16,
  },
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    elevation: 3, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  icon: {
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
  },
  closeButton: {
    marginLeft: 10,
    padding: 4,
  },
});

export default CustomToast;
