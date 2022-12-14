import { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import { Button, Input } from "@rneui/themed";
import { supabase } from "../lib/supabase";

import { View, useThemeColor } from "../components/Themed";
import useColorScheme from "../hooks/useColorScheme";
import { StyledText } from "../components/StyledText";

const styles = StyleSheet.create({
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: "stretch"
    },
    mt20: {
        marginTop: 20
    }
});

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const signInWithEmail = async () => {
        setLoading(true);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        if (error) Alert.alert(error.message);

        setLoading(false);
    };

    const signUpWithEmail = async () => {
        setLoading(true);

        const { error } = await supabase.auth.signUp({
            email,
            password
        });
        if (error) Alert.alert(error.message);

        setLoading(false);
    };

    return (
        <View
            style={{
                height: "100%",
                justifyContent: "center",
                backgroundColor: useThemeColor({}, "background"),
                paddingHorizontal: 12
            }}
        >
            <StyledText
                style={{ textAlign: "center", fontSize: 48, fontWeight: "700" }}
            >
                Login
            </StyledText>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Email"
                    leftIcon={{
                        type: "feather",
                        name: "mail",
                        color: useThemeColor({}, "text")
                    }}
                    inputStyle={{ color: useThemeColor({}, "text") }}
                    leftIconContainerStyle={{ marginRight: 10 }}
                    onChangeText={(text) => setEmail(text)}
                    value={email}
                    autoCapitalize="none"
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Input
                    label="Password"
                    leftIcon={{
                        type: "feather",
                        name: "lock",
                        color: useThemeColor({}, "text")
                    }}
                    leftIconContainerStyle={{ marginRight: 10 }}
                    inputStyle={{ color: useThemeColor({}, "text") }}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button
                    title="Sign in"
                    disabled={loading}
                    onPress={() => signInWithEmail()}
                    buttonStyle={{ backgroundColor: useThemeColor({}, "tint") }}
                    titleStyle={{
                        color: useColorScheme() === "dark" ? "black" : "white"
                    }}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Button
                    title="Sign up"
                    disabled={loading}
                    onPress={() => signUpWithEmail()}
                    buttonStyle={{ backgroundColor: useThemeColor({}, "tint") }}
                    titleStyle={{
                        color: useColorScheme() === "dark" ? "black" : "white"
                    }}
                />
            </View>
        </View>
    );
};

export default Login;
