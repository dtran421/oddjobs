import React from "react";
import { TouchableOpacity } from "react-native";
import { Card } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import { Shift } from "../lib/schema";
import { View, useThemeColor } from "./Themed";
import { StyledText } from "./StyledText";
import { formatDate, formatStartTime, formatShiftLength } from "../lib/utils";

const ShiftCard = ({
    shift: {
        id,
        company,
        position,
        date,
        start_time: startTime,
        shift_length: shiftLength
    },
    disabled = false
}: {
    shift: Shift;
    disabled?: boolean;
}) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity
            onPress={() =>
                !disabled && navigation.navigate("Shift", { shiftId: id })
            }
        >
            <Card
                containerStyle={{
                    borderColor: useThemeColor({}, "background"),
                    borderRadius: 8,
                    padding: 0,
                    marginBottom: 20
                }}
            >
                <LinearGradient
                    start={[0, 1]}
                    end={[1, 0]}
                    colors={["#2cf933", "#16d53c", "#1ab00e"]}
                    style={{
                        borderRadius: 8,
                        padding: 20
                    }}
                >
                    <View style={{ backgroundColor: "transparent" }}>
                        <View
                            style={{
                                backgroundColor: "transparent",
                                marginBottom: 14
                            }}
                        >
                            <StyledText
                                darkColor="black"
                                style={{ fontSize: 26, fontWeight: "700" }}
                            >
                                {position}
                            </StyledText>
                            <StyledText
                                darkColor="black"
                                style={{ fontSize: 20, fontWeight: "500" }}
                            >
                                {company}
                            </StyledText>
                        </View>
                        <StyledText
                            darkColor="black"
                            style={{ marginBottom: 4 }}
                        >
                            {formatDate(date)}
                        </StyledText>
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                backgroundColor: "transparent"
                            }}
                        >
                            <StyledText darkColor="black">
                                {formatStartTime(startTime)}
                            </StyledText>
                            <StyledText darkColor="black">
                                {formatShiftLength(shiftLength)}
                            </StyledText>
                        </View>
                    </View>
                </LinearGradient>
            </Card>
        </TouchableOpacity>
    );
};

export default ShiftCard;
