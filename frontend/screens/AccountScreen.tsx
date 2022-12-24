import { StyleSheet, useColorScheme } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useThemeColor, View } from "../components/Themed";

import { supabase } from "../lib/supabase";
import { useContext } from "react";
import { AuthContext } from "../lib/AuthContext";
import { StyledText } from "../components/StyledText";

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 12
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: "stretch"
    },
    mt20: {
        marginTop: 20
    }
});

const AccountScreen = () => {
    const { session } = useContext(AuthContext);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "space-between",
                paddingHorizontal: 20,
                paddingTop: 80,
                paddingBottom: 20
            }}
        >
            <View style={[styles.verticallySpaced]}>
                <StyledText
                    style={{
                        fontSize: 44,
                        fontWeight: "700",
                        marginLeft: 12,
                        marginBottom: 18
                    }}
                >
                    Account
                </StyledText>
                <Input
                    label="Email"
                    value={session?.user?.email}
                    disabled
                    disabledInputStyle={{ color: "white" }}
                />
            </View>
            <View style={styles.verticallySpaced}>
                <Button
                    title="Sign Out"
                    onPress={() => supabase.auth.signOut()}
                    icon={{
                        name: "log-out",
                        type: "feather",
                        size: 18,
                        color: "black"
                    }}
                    iconContainerStyle={{ marginRight: 10 }}
                    buttonStyle={{ backgroundColor: useThemeColor({}, "tint") }}
                    titleStyle={{
                        color: useColorScheme() === "dark" ? "black" : "white",
                        fontWeight: "700"
                    }}
                />
            </View>
        </View>
    );
};

export default AccountScreen;
