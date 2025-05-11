
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity, Platform } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { GradientButtonNative } from '../shared/GradientButtonNative';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters.").max(100),
  description: z.string().min(10, "Description must be at least 10 characters.").max(1000),
  date: z.string().refine((dateStr) => !isNaN(Date.parse(dateStr)), "Invalid date format."),
  time: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)."),
  location: z.string().min(5, "Location must be at least 5 characters.").max(200),
  category: z.string().min(2, "Category is required.").max(50),
  tags: z.string().optional(),
  imageUrl: z.string().url("Invalid URL format.").optional().or(z.literal('')),
  isPrivate: z.boolean().default(false),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

interface EventFormProps {
  onSubmit: (data: EventFormValues) => void;
  defaultValues?: Partial<EventFormValues>;
  isLoading?: boolean;
}

export const EventFormNative: React.FC<EventFormProps> = ({ onSubmit, defaultValues, isLoading }) => {
  const { theme } = useTheme();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  // Use a separate state for the Date objects from pickers
  const [selectedDateObj, setSelectedDateObj] = useState<Date>(
    defaultValues?.date ? new Date(defaultValues.date + (defaultValues.time ? `T${defaultValues.time}` : '')) : new Date()
  );

  const { control, handleSubmit, formState: { errors }, setValue, watch } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      isPrivate: false,
      date: defaultValues?.date ? format(new Date(defaultValues.date), 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
      time: defaultValues?.time || format(new Date(), 'HH:mm'),
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      location: defaultValues?.location || '',
      category: defaultValues?.category || '',
      tags: defaultValues?.tags || '',
      imageUrl: defaultValues?.imageUrl || '',
    },
  });

  const onDateChange = (event: DateTimePickerEvent, newSelectedDate?: Date) => {
    setShowDatePicker(false);
    if (newSelectedDate) {
      setSelectedDateObj(newSelectedDate);
      setValue('date', format(newSelectedDate, 'yyyy-MM-dd'));
    }
  };

  const onTimeChange = (event: DateTimePickerEvent, newSelectedTime?: Date) => {
    setShowTimePicker(false);
    if (newSelectedTime) {
      // Preserve the date part from selectedDateObj, only update time
      const updatedDateTime = new Date(selectedDateObj);
      updatedDateTime.setHours(newSelectedTime.getHours());
      updatedDateTime.setMinutes(newSelectedTime.getMinutes());
      setSelectedDateObj(updatedDateTime);
      setValue('time', format(updatedDateTime, 'HH:mm'));
    }
  };
  
  const watchedDate = watch('date');
  const watchedTime = watch('time');

  function handleFormSubmit(data: EventFormValues) {
    // The date and time are already strings in the correct format for combination
    const combinedDateTime = `${data.date}T${data.time}:00Z`; // Assuming local time needs to be ISO with Z offset
    onSubmit({ ...data, date: combinedDateTime });
  }
  
  const styles = StyleSheet.create({
    formContainer: { paddingBottom: 20 },
    fieldContainer: { marginBottom: 20 },
    labelContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    label: { fontSize: 18, fontFamily: 'Inter-SemiBold', color: theme.colors.foreground, marginLeft: 8 },
    input: {
      backgroundColor: theme.colors.input, color: theme.colors.foreground, borderWidth: 1,
      borderColor: theme.colors.border, borderRadius: theme.radius, paddingHorizontal: 16,
      paddingVertical: Platform.OS === 'ios' ? 14 : 12, fontSize: 16, fontFamily: 'Inter-Regular',
    },
    textArea: { minHeight: 100, textAlignVertical: 'top' },
    inputError: { borderColor: theme.colors.destructive },
    errorMessage: { color: theme.colors.destructive, fontSize: 12, fontFamily: 'Inter-Regular', marginTop: 4 },
    descriptionText: { fontSize: 12, color: theme.colors.mutedForeground, fontFamily: 'Inter-Regular', marginTop: 4 },
    dateTimeRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
    dateTimeInputContainer: { flex: 1 },
    switchContainer: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      backgroundColor: theme.colors.card, borderWidth: 1, borderColor: theme.colors.border,
      borderRadius: theme.radius, padding: 16,
    },
    switchLabelContainer: { flex: 1, marginRight: 16 },
    switchLabel: { fontSize: 16, fontFamily: 'Inter-SemiBold', color: theme.colors.foreground },
    dateTimePickerButton: {
        backgroundColor: theme.colors.input,
        borderWidth: 1,
        borderColor: theme.colors.border,
        borderRadius: theme.radius,
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === 'ios' ? 14 : 12,
        alignItems: 'center',
    },
    dateTimePickerText: {
        color: theme.colors.foreground,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
    }
  });

  return (
    <View style={styles.formContainer}>
      {/* Title */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}><Feather name="type" size={20} color={theme.colors.primary} /><Text style={styles.label}>Event Title</Text></View>
        <Controller control={control} name="title" render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={[styles.input, errors.title && styles.inputError]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="e.g., Neon Night Party" placeholderTextColor={theme.colors.mutedForeground} />
        )}/>
        <Text style={styles.descriptionText}>Choose a catchy title for your event.</Text>
        {errors.title && <Text style={styles.errorMessage}>{errors.title.message}</Text>}
      </View>

      {/* Description */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}><Feather name="file-text" size={20} color={theme.colors.primary} /><Text style={styles.label}>Event Description</Text></View>
        <Controller control={control} name="description" render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={[styles.input, styles.textArea, errors.description && styles.inputError]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="Tell everyone about your event..." placeholderTextColor={theme.colors.mutedForeground} multiline />
        )}/>
        {errors.description && <Text style={styles.errorMessage}>{errors.description.message}</Text>}
      </View>

      {/* Date and Time */}
      <View style={styles.dateTimeRow}>
          <View style={[styles.fieldContainer, styles.dateTimeInputContainer]}>
              <View style={styles.labelContainer}><Feather name="calendar" size={20} color={theme.colors.primary} /><Text style={styles.label}>Date</Text></View>
              <TouchableOpacity style={styles.dateTimePickerButton} onPress={() => setShowDatePicker(true)}>
                  <Text style={styles.dateTimePickerText}>{watchedDate ? format(new Date(watchedDate), 'PPP') : "Select Date"}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDateObj}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onDateChange}
                />
              )}
              {errors.date && <Text style={styles.errorMessage}>{errors.date.message}</Text>}
          </View>
          <View style={[styles.fieldContainer, styles.dateTimeInputContainer]}>
              <View style={styles.labelContainer}><Feather name="clock" size={20} color={theme.colors.primary} /><Text style={styles.label}>Time</Text></View>
              <TouchableOpacity style={styles.dateTimePickerButton} onPress={() => setShowTimePicker(true)}>
                  <Text style={styles.dateTimePickerText}>{watchedTime || "Select Time"}</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={selectedDateObj} // Use selectedDateObj to initialize time picker correctly
                  mode="time"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={onTimeChange}
                  is24Hour={true} // Use 24-hour format
                />
              )}
              {errors.time && <Text style={styles.errorMessage}>{errors.time.message}</Text>}
          </View>
      </View>


      {/* Location */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}><Feather name="map-pin" size={20} color={theme.colors.primary} /><Text style={styles.label}>Location</Text></View>
        <Controller control={control} name="location" render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={[styles.input, errors.location && styles.inputError]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="e.g., Downtown Hub, 123 Main St" placeholderTextColor={theme.colors.mutedForeground} />
        )}/>
        {errors.location && <Text style={styles.errorMessage}>{errors.location.message}</Text>}
      </View>

      {/* Category */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}><Feather name="grid" size={20} color={theme.colors.primary} /><Text style={styles.label}>Category</Text></View>
        <Controller control={control} name="category" render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={[styles.input, errors.category && styles.inputError]} onBlur={onBlur} onChangeText={onChange} value={value} placeholder="e.g., Music, Tech, Art" placeholderTextColor={theme.colors.mutedForeground} />
        )}/>
         <Text style={styles.descriptionText}>Help people find your event.</Text>
        {errors.category && <Text style={styles.errorMessage}>{errors.category.message}</Text>}
      </View>

      {/* Tags */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}><Feather name="tag" size={20} color={theme.colors.primary} /><Text style={styles.label}>Tags (optional)</Text></View>
        <Controller control={control} name="tags" render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={styles.input} onBlur={onBlur} onChangeText={onChange} value={value || ''} placeholder="e.g., livemusic, festival (comma-separated)" placeholderTextColor={theme.colors.mutedForeground} />
        )}/>
        <Text style={styles.descriptionText}>Add tags to improve discoverability.</Text>
      </View>

      {/* Image URL */}
      <View style={styles.fieldContainer}>
        <View style={styles.labelContainer}><Feather name="image" size={20} color={theme.colors.primary} /><Text style={styles.label}>Image URL (optional)</Text></View>
        <Controller control={control} name="imageUrl" render={({ field: { onChange, onBlur, value } }) => (
            <TextInput style={[styles.input, errors.imageUrl && styles.inputError]} onBlur={onBlur} onChangeText={onChange} value={value || ''} placeholder="https://example.com/image.png" placeholderTextColor={theme.colors.mutedForeground} keyboardType="url" />
        )}/>
         <Text style={styles.descriptionText}>A captivating image can attract more attendees. Actual image upload coming soon!</Text>
        {errors.imageUrl && <Text style={styles.errorMessage}>{errors.imageUrl.message}</Text>}
      </View>

      {/* Private Event Switch */}
      <View style={styles.fieldContainer}>
        <Controller control={control} name="isPrivate" render={({ field: { onChange, value } }) => (
            <View style={styles.switchContainer}>
                <View style={styles.switchLabelContainer}>
                    <Text style={styles.switchLabel}>Private Event</Text>
                    <Text style={styles.descriptionText}>Private events are only visible to invited guests.</Text>
                </View>
                <Switch
                    trackColor={{ false: theme.colors.muted, true: theme.colors.primary }}
                    thumbColor={value ? theme.colors.primaryForeground : theme.colors.mutedForeground}
                    ios_backgroundColor={theme.colors.muted}
                    onValueChange={onChange}
                    value={value}
                />
            </View>
        )}/>
      </View>

      <GradientButtonNative onPress={handleSubmit(handleFormSubmit)} disabled={isLoading} title={isLoading ? "Submitting..." : (defaultValues?.title ? "Update Event" : "Create Event")} style={{marginTop: 20}} />
    </View>
  );
};
