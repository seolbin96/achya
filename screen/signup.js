import { StyleSheet, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigation } from '@react-navigation/native';

const Signupscreen = () => {
    const navigation = useNavigation();
    /* Signup State */
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    /* Signup Function */
    const onHandleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    const userRef = doc(db, "users", user.uid);
                    setDoc(userRef, {
                        displayName: name,
                        email: email,
                        uid: user.uid,
                        createdAt: new Date().toUTCString(),
                    });
                })
                .then(() => alert("Data uploaded"));
        } catch (error) {
            Alert.alert(error.message);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container} behavior="padding">
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>뒤로가기</Text>
            </TouchableOpacity>
            {/* Signup Input Box */}
            <TextInput
                style={styles.input}
                placeholder="Enter name"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <TextInput
                style={styles.input}
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={(text) => setPassword(text)}
            />

            {/* Signup Button */}
            <TouchableOpacity style={styles.btn} onPress={onHandleSignup}>
                <Text
                    style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}
                >
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Signupscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        color: "black",
    },

    btn: {
        backgroundColor: "#223a5e",
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    input: {
        margin: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        padding: 20,
    },
});