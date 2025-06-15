import { AppUser, ProfileForm } from "@/components/model/User";
import { getUserContext } from "@/contexts/UserContext";
import { uploadProfileDetailsToDB } from "@/utils/firebase-utils";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function EditProfileScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>();
  const theme = useTheme();
  const { user, setUser } = getUserContext();
  const onSubmit = (data: ProfileForm) => {
    console.log("Updated Profile:", data);
    // call Firestore update here
    if (!user) return;
    uploadProfileDetailsToDB("users", user.uid, data);
    setUser({ ...user, ...data });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <Controller
        control={control}
        name="displayName"
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Name"
            value={value}
            onChangeText={onChange}
            mode="outlined"
            error={!!errors.displayName}
            style={styles.input}
          />
        )}
      />
      {errors.displayName && (
        <Text style={styles.error}>{errors.displayName.message}</Text>
      )}

      <Controller
        control={control}
        name="biometrics.weight"
        rules={{
          pattern: { value: /^\d+$/, message: "Weight must be a number" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Weight (kg)"
            value={(value || "").toString()}
            onChangeText={onChange}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />
        )}
      />
      {errors.biometrics?.weight && (
        <Text style={styles.error}>{errors.biometrics.weight.message}</Text>
      )}

      <Controller
        control={control}
        name="biometrics.height"
        rules={{
          pattern: { value: /^\d+$/, message: "Height must be a number" },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            label="Height (cm)"
            value={(value || "").toString()}
            onChangeText={onChange}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />
        )}
      />
      {errors.biometrics?.height && (
        <Text style={styles.error}>{errors.biometrics.height.message}</Text>
      )}

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
    backgroundColor: "#059669",
  },
  error: {
    color: "red",
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 12,
  },
});
