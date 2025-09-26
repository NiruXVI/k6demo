// Import React and React Native components
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, AppRegistry } from "react-native";

// Main App component - the root component of our login application
export default function App() {
  // State management using React hooks
  const [email, setEmail] = useState("");       // Stores the user's email input
  const [password, setPassword] = useState(""); // Stores the user's password input
  const [status, setStatus] = useState("");     // Stores login status/result messages

  // Function to handle login button press
  const handleLogin = () => {
    // Make HTTP POST request to the login API endpoint
    fetch("http://192.168.22.239:5000/api/login", {
      method: "POST",                                    // Use POST method for sending credentials
      headers: { "Content-Type": "application/json" },  // Specify that we're sending JSON data
      body: JSON.stringify({ email, password }),        // Convert email/password to JSON string
    })
      .then((res) => res.json())        // Parse the response as JSON
      .then((data) => setStatus(data.status))  // Update status with server response
      .catch(() => setStatus("error"));        // Handle any network/parsing errors
  };

  // Render the UI components
  return (
    <View style={styles.container}>
      {/* App title */}
      <Text style={styles.title}>Login Demo</Text>
      
      {/* Email input field */}
      <TextInput
        style={styles.input}           // Apply input styling
        placeholder="Email"            // Placeholder text when field is empty
        value={email}                  // Controlled input - value comes from state
        onChangeText={setEmail}        // Update email state when user types
      />
      
      {/* Password input field */}
      <TextInput
        style={styles.input}           // Apply input styling
        placeholder="Password"         // Placeholder text when field is empty
        secureTextEntry               // Hide password characters for security
        value={password}              // Controlled input - value comes from state
        onChangeText={setPassword}    // Update password state when user types
      />
      
      {/* Login button */}
      <Button title="Login" onPress={handleLogin} />
      
      {/* Status message display - shows login result */}
      <Text style={styles.status}>{status}</Text>
    </View>
  );
}

// Stylesheet object containing all component styles
const styles = StyleSheet.create({
  // Main container style - centers content and adds padding
  container: { 
    flex: 1,                    // Take up full screen height
    justifyContent: "center",   // Center content vertically
    alignItems: "center",       // Center content horizontally
    padding: 20                 // Add 20 units of padding around edges
  },
  
  // Title text style
  title: { 
    fontSize: 24,               // Large font size for prominence
    marginBottom: 20            // Space below the title
  },
  
  // Input field style - applies to both email and password fields
  input: { 
    width: "100%",              // Full width of container
    borderWidth: 1,             // 1 pixel border
    borderColor: "#ccc",        // Light gray border color
    padding: 10,                // Internal padding for text
    marginBottom: 10,           // Space below each input
    borderRadius: 5             // Rounded corners
  },
  
  // Status message style
  status: { 
    marginTop: 20,              // Space above the status text
    fontSize: 18                // Medium font size for readability
  },
});

// Register the app component with React Native
// This is required for React Native to know which component is the root
AppRegistry.registerComponent('main', () => App);