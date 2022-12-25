import { useContext, useEffect, useState } from "react";
import { Alert, StyleSheet, useColorScheme } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useThemeColor, View } from "../components/Themed";

import { supabase } from "../lib/supabase";
import { AuthContext } from "../lib/AuthContext";
import { StyledText } from "../components/StyledText";
import ShiftCard from "../components/ShiftCard";
import { Shift } from "../lib/schema";
import { RootTabScreenProps } from "../types";

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

const AccountScreen = ({ navigation }: RootTabScreenProps<"Account">) => {
    const { session } = useContext(AuthContext);

    const [isFetching, setFetching] = useState(true);
    const [shifts, setShifts] = useState<Shift[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(
                `http://127.0.0.1:8000/accounts/${session?.user.id}/shifts`
            );
            if (!response.ok) {
                const message = await response.text();
                console.error(message);
                Alert.alert(message);
            }

            const data = await response.json();
            setShifts(data);
            setFetching(false);
        };

        if (isFetching) {
            setFetching(false);
            fetchData();
        }

        const focusSubscription = navigation.addListener("focus", () => {
            setFetching(true);
            fetchData();
        });

        return focusSubscription;
    }, [isFetching, navigation, session?.user.id]);

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
            <View style={styles.verticallySpaced}>
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
            <View
                style={[
                    styles.verticallySpaced,
                    { flex: 1, justifyContent: "flex-start" }
                ]}
            >
                <StyledText
                    style={{
                        fontSize: 24,
                        fontWeight: "600",
                        marginLeft: 12,
                        marginTop: 10
                    }}
                >
                    Upcoming Shifts
                </StyledText>
                {shifts.map((shift) => (
                    <ShiftCard key={shift.id} {...{ shift }} disabled />
                ))}
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
