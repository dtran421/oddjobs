import { useCallback, useEffect, useState } from "react";
import { StyleSheet, ScrollView, RefreshControl, Alert } from "react-native";

import ShiftCard from "../components/ShiftCard";
import { RootTabScreenProps } from "../types";
import { Shift } from "../lib/schema";
import { View } from "../components/Themed";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: "80%"
    }
});

const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {
    const [isFetching, setFetching] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [shifts, setshifts] = useState<Shift[]>([]);

    const onRefresh = useCallback(() => {
        if (!isFetching) setRefreshing(true);
    }, [isFetching]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://127.0.0.1:8000/shifts");
            if (!response.ok) {
                const message = await response.text();
                console.error(message);
                Alert.alert(message);
            }

            const data = await response.json();
            setshifts(data);
            setFetching(false);
            setRefreshing(false);
        };

        if (isFetching || refreshing) {
            setFetching(false);
            fetchData();
        }

        const focusSubscription = navigation.addListener("focus", () => {
            setRefreshing(true);
            fetchData();
        });

        return focusSubscription;
    }, [isFetching, navigation, refreshing, shifts]);

    return (
        <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View
                style={{
                    width: "100%",
                    flex: 1
                }}
            >
                {shifts.map((shift) => (
                    <ShiftCard key={shift.id} {...{ shift }} />
                ))}
            </View>
        </ScrollView>
    );
};

export default HomeScreen;
