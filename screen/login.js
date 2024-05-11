import {
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";

const Loginscreen = ({}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState("");

    const onHandleLogin = () => {
        if (email !== "" && password !== "") {
            signInWithEmailAndPassword(auth, email, password)
                .then((e) => console.log("Login success", e.user.email))
                .catch((err) => Alert.alert("Login error", err.message));
        }
    };

    const handleSignup = () => {
        navigation.navigate('Signup'); // SignupScreen으로 이동
    };

    const clearInputs = () => {
        setEmail("");
        setPassword("");
    };

    const handleLogout = () => {
        auth.signOut();
    };

    const authListener = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("user", user);
                clearInputs();
                setUser(user);
            } else {
                setUser("");
            }
        });
    };

    useEffect(() => {
        authListener();
    }, []);

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            {/* 회원가입 버튼 */}
            <View>
                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={styles.signupButtonText}>회원가입</Text>
                </TouchableOpacity>
            </View>
            {/* Login Input Box */}
            <View>
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
            </View>

            {/* Login Button */}
            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={onHandleLogin}>
                    <Text style={styles.btntext}>Log In</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity style={styles.btn} onPress={handleLogout}>
                    <Text style={styles.btntext}>Log Out</Text>
                </TouchableOpacity>
            </View>
            <Text style={{ margin: 20 }}>
                유저이메일 결과 확인: {user ? user.email : "로그인 아웃 중"}
            </Text>
        </KeyboardAvoidingView>
    );
};

export default Loginscreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        color: "black",
    },

    signupButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
    },
    signupButtonText: {
        color: 'white',
        fontSize: 16,
    },

    btnContainer: {
        width: "78%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
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
    },

    btntext: {
        color: "#ffffff",
    },
});