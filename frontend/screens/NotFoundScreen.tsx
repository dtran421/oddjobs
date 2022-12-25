import { StyleSheet, TouchableOpacity } from "react-native";

import { View } from "../components/Themed";
import { StyledText } from "../components/StyledText";
import { RootStackScreenProps } from "../types";

export default function NotFoundScreen({
    navigation
}: RootStackScreenProps<"NotFound">) {
    return (
        <View style={styles.container}>
            <StyledText style={styles.title}>
                This screen doesn't exist.
            </StyledText>
            <TouchableOpacity
                onPress={() => navigation.replace("Root")}
                style={styles.link}
            >
                <StyledText style={styles.linkStyledText}>
                    Go to home screen!
                </StyledText>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    link: {
        marginTop: 15,
        paddingVertical: 15
    },
    linkStyledText: {
        fontSize: 14,
        color: "#2e78b7"
    }
});
