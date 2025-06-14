import { EditProfileFormData } from "@/components/model/User";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function EditProfileScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditProfileFormData>();
  const theme = useTheme();

  const onSubmit = (data: EditProfileFormData) => {
    console.log("Updated Profile:", data);
    // call Firestore update here
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Name"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            error={!!errors.name}
            style={styles.input}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      <Controller
        control={control}
        name="weight"
        rules={{
          pattern: { value: /^\d+$/, message: "Weight must be a number" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Weight (kg)"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />
        )}
      />
      {errors.weight && (
        <Text style={styles.error}>{errors.weight.message}</Text>
      )}

      <Controller
        control={control}
        name="height"
        rules={{
          pattern: { value: /^\d+$/, message: "Height must be a number" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Height (cm)"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />
        )}
      />
      {errors.height && (
        <Text style={styles.error}>{errors.height.message}</Text>
      )}

      <Controller
        control={control}
        name="shoeModel"
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Running Shoe Model"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            style={styles.input}
          />
        )}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={styles.saveButton}
      >
        Save Changes
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    marginBottom: 20,
    fontSize: 24,
    fontWeight: "bold",
    alignSelf: "center",
  },
  input: {
    marginBottom: 12,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 6,
  },
  error: {
    color: "red",
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 12,
  },
});
