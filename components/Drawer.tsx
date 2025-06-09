// import HomeScreen from "@/app/protected/(tabs)/home";
// import { auth } from "@/lib/firebase";
// import { createDrawerNavigator } from "@react-navigation/drawer";
// import { signOut } from "firebase/auth";
// import { Button, View } from "react-native";

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props: any) {
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       props.navigation.reset({
//         index: 0,
//         routes: [{ name: "Login" }],
//       });
//     } catch (e) {
//       console.error("Logout failed", e);
//     }
//   };

//   return (
//     <View style={{ flex: 1, paddingTop: 50 }}>
//       {/* Default Drawer content */}
//       {props.children}
//       <Button title="Logout" onPress={handleLogout} />
//     </View>
//   );
// }

// export default function AppNavigator() {
//   return (
//     <Drawer.Navigator
//       drawerContent={(props) => <CustomDrawerContent {...props} />}
//       screenOptions={{ headerShown: false }}
//     >
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       {/* Add other screens here */}
//     </Drawer.Navigator>
//   );
// }
